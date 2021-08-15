using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PersonalInfoSys.Models
{
    public class Address
    {
        public string AddressType { get; set; }
        public string Province { get; set; }
        public string City { get; set; }
        public string SelectedCat { get; set; }
        public int Ward { get; set; }
        public string Tole { get; set; }
        //public string Street { get; set; }

    }
}