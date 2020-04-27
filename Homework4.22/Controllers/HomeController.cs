using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Homework4._22.Models;
using Homework4._22.Data;

namespace Homework4._22.Controllers
{
    public class HomeController : Controller
    {
        PersonDb db = new PersonDb(@"Data Source=.\sqlexpress;Initial Catalog=MyDB;Integrated Security=true;");
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult GetPeople()
        {
            return Json(db.GetPeople());
        }

        [HttpPost]
        public IActionResult AddPerson(Person person)
        {
            db.AddPerson(person);
            return Json(person);
        }
       
        [HttpPost]
        public IActionResult EditPerson(Person person)
        {
            db.EditPerson(person);
            return Json(person);
        }
        [HttpPost]
        public IActionResult DeletePerson(int id)
        {
            db.DeletePerson(id);
            return Json(id);
        }
    }
}
