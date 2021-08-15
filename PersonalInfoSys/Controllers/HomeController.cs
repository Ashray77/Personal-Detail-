using PersonalInfoSys.DB;
using PersonalInfoSys.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Mvc;

namespace PersonalInfoSys.Controllers
{
    public class HomeController : Controller
    {
        DBCon conn = new DBCon();
        public ActionResult Index()
        {
            return View();
        }

        //public ActionResult About()
        //{
        //    ViewBag.Message = "Your application description page.";

        //    return View();
        //}

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public ActionResult GetJsonData(PersonalInfo data)
        {
            string message;
            conn.SaveData(data, out message);
            return Json(new JsonResult { Data = message });
            //return Json(data);
        }

        [HttpGet]
        public ActionResult About()
        {
            return View();   
        }

        [HttpPost]
        public ActionResult About(PersonalDetail personalDetail)
        {
            return View(conn.GetData());
        }
    }
}