using Newtonsoft.Json;
using PersonalInfoSys.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PersonalInfoSys.DB
{
    public class DBCon
    {
        private string connectionString = string.Empty;

        private SqlConnection sqlcon;

        public DBCon()
        {
            connectionString = ConfigurationManager.ConnectionStrings["myConnection"].ToString();

        }
        public void createConnection()
        {
            sqlcon = new SqlConnection(connectionString);

        }

        public void SaveData(PersonalInfo data, out string message)
        {
            if (data.Id == 0)
            {
                try
                {
                    createConnection();
                    SqlCommand cmd = new SqlCommand("usp_personal_detail_insert", sqlcon);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    string jsondata = JsonConvert.SerializeObject(data.AddressList);
                    string jsonEdu = JsonConvert.SerializeObject(data.Educations);
                    cmd.Parameters.AddWithValue("@SALUTATION", data.Salutation);
                    cmd.Parameters.AddWithValue("@FIRST_NAME", data.FirstName);
                    cmd.Parameters.AddWithValue("@LAST_NAME", data.LastName);
                    cmd.Parameters.AddWithValue("@AGE", data.Age);
                    cmd.Parameters.AddWithValue("@PHONE_NUMBER", data.PhoneNumber);
                    cmd.Parameters.AddWithValue("@EMAIL", data.Email);
                    cmd.Parameters.AddWithValue("@GENDER", data.Gender);
                    cmd.Parameters.AddWithValue("@EDUCATION", jsonEdu);
                    cmd.Parameters.AddWithValue("@NATIONALITY", data.Nationality);
                    cmd.Parameters.AddWithValue("@ADD_JSON", jsondata);
                    sqlcon.Open();
                    cmd.ExecuteNonQuery();
                    sqlcon.Close();

                    message = "Inserted Successfully";

                }
                catch (Exception ex)
                {
                    message = ex.Message;
                }
            }

            else 
            {
                try
                {
                    createConnection();
                    SqlCommand cmd = new SqlCommand("USP_PERSONAL_DETAIL_UPDATE", sqlcon);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    string jsondata = JsonConvert.SerializeObject(data.AddressList);
                    string jsonEdu = JsonConvert.SerializeObject(data.Educations);
                    cmd.Parameters.AddWithValue("@Id", data.Id);
                    cmd.Parameters.AddWithValue("@SALUTATION", data.Salutation);
                    cmd.Parameters.AddWithValue("@FIRST_NAME", data.FirstName);
                    cmd.Parameters.AddWithValue("@LAST_NAME", data.LastName);
                    cmd.Parameters.AddWithValue("@AGE", data.Age);
                    cmd.Parameters.AddWithValue("@PHONE_NUMBER", data.PhoneNumber);
                    cmd.Parameters.AddWithValue("@EMAIL", data.Email);
                    cmd.Parameters.AddWithValue("@GENDER", data.Gender);
                    cmd.Parameters.AddWithValue("@EDUCATION", jsonEdu);
                    cmd.Parameters.AddWithValue("@NATIONALITY", data.Nationality);
                    cmd.Parameters.AddWithValue("@ADD_JSON", jsondata);
                    sqlcon.Open();
                    cmd.ExecuteNonQuery();
                    sqlcon.Close();

                    message = "Update Successfully";
                }

                catch (Exception ex)
                {
                    message = ex.Message;
                }

            }            
        }

        public List<PersonalDetail> GetData()
        {
            List<PersonalDetail> PersonalList = new List<PersonalDetail>();
            string CS = ConfigurationManager.ConnectionStrings["myConnection"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM PERSONAL_DETAIL", con);
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    var personaldetail = new PersonalDetail();

                    personaldetail.Id = int.Parse(rdr["Id"].ToString());
                    personaldetail.Salutation = rdr["SALUTATION"].ToString();
                    personaldetail.FirstName = rdr["FIRST_NAME"].ToString();
                    personaldetail.LastName = rdr["LAST_NAME"].ToString();
                    personaldetail.Age = rdr["AGE"].ToString();
                    personaldetail.PhoneNumber = rdr["PHONE_NUM"].ToString();
                    personaldetail.Email = rdr["EMAIL"].ToString();
                    personaldetail.Gender = rdr["GENDER"].ToString();
                    personaldetail.Nationality = rdr["NATIONALITY"].ToString();

                    PersonalList.Add(personaldetail);

                }
                //return View(PersonalList);
                return PersonalList;
            }
        }

        public PersonalInfo FetchData(int? Id)
        {
            PersonalInfo personalInfo = new PersonalInfo();
            List<Education> EduList = new List<Education>();
            List<Address> AddList = new List<Address>();
            string CS = ConfigurationManager.ConnectionStrings["myConnection"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("USP_PERSONAL_DETAIL_SELECTALLDATA", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", Id);
                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        personalInfo.Id = int.Parse(rdr["Id"].ToString());
                        personalInfo.Salutation = rdr["SALUTATION"].ToString();
                        personalInfo.FirstName = rdr["FIRST_NAME"].ToString();
                        personalInfo.LastName = rdr["LAST_NAME"].ToString();
                        personalInfo.Age = rdr["AGE"].ToString();
                        personalInfo.PhoneNumber = rdr["PHONE_NUM"].ToString();
                        personalInfo.Email = rdr["EMAIL"].ToString();
                        personalInfo.Gender = rdr["GENDER"].ToString();
                        personalInfo.Nationality = rdr["NATIONALITY"].ToString();
                    }
                }
                if (rdr.NextResult())
                {
                    while (rdr.Read())
                    {
                        EduList.Add(new Education { Name = rdr["EDU_NAME"].ToString() });

                    }
                    personalInfo.Educations = EduList;
                }
                if (rdr.NextResult())
                {
                    while (rdr.Read())
                    {
                        AddList.Add(new Address
                        {
                            AddressType = rdr["ADD_TYPE"].ToString(),
                            Province = rdr["PROVINCE"].ToString(),
                            City = rdr["CITY"].ToString(),
                            SelectedCat = rdr["CITY_CATEGORY"].ToString(),
                            Ward = int.Parse(rdr["WARD"].ToString()),
                            Tole = rdr["TOLE"].ToString()
                        });

                    }
                    personalInfo.AddressList = AddList;

                }
            }
            return personalInfo;
        }

        public void Delete(int? id, out string message)
        {
            try
            {
                createConnection();
                SqlCommand cmd = new SqlCommand("usp_personal_detail_delete", sqlcon);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@id", id);

                sqlcon.Open();
                cmd.ExecuteNonQuery();
                sqlcon.Close();

                message = "success";

            }
            catch (Exception ex)
            {
                message = ex.Message;
            }
        }


    }
}