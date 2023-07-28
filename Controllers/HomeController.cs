using Microsoft.AspNetCore.Mvc;

namespace WIL_Project_1.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
