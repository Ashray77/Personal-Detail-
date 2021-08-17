using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PersonalInfoSys.Models
{
    public class PersonalDetail
    {
        public int Id { get; set; }
        public string Salutation { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Nationality { get; set; }
    }
}