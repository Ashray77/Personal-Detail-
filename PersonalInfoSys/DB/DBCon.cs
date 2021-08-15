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

                message = "Success";

            }
            catch (Exception ex)
            {
                message = ex.Message;
            }
        }

        public JsonResult GetData()
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

                    personaldetail.Salutation = rdr["SALUTATION"].ToString();
                    personaldetail.FirstName = rdr["FIRST_NAME"].ToString();
                    personaldetail.LastName = rdr["LAST_NAME"].ToString();
                    personaldetail.Age = Convert.ToInt32(rdr["AGE"]);
                    personaldetail.PhoneNumber = rdr["PHONE_NUM"].ToString();
                    personaldetail.Email = rdr["EMAIL"].ToString();
                    personaldetail.Gender = rdr["GENDER"].ToString();
                    personaldetail.Nationality = rdr["NATIONALITY"].ToString();

                    PersonalList.Add(personaldetail);
                }
                //return View(PersonalList);
                return new JsonResult { Data = PersonalList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }


    }
}