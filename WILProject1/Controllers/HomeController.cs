using Microsoft.AspNetCore.Mvc;
using System.Linq;
using DAL;

namespace WIL_Project_1.Controllers
{
    public class HomeController : Controller
    {
        private readonly BookmarkContext _dbContext;

        public HomeController(BookmarkContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IActionResult Index()
        {
            var bookmarks = _dbContext.Bookmarks.ToList();
            return View(bookmarks);
        }
    }
}