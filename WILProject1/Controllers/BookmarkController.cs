using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using DAL;

namespace WIL_Project_1.Controllers
{
    [ApiController]
    [Route("api/bookmark")]
    public class BookmarkController : ControllerBase
    {
        private readonly BookmarkContext _context;

        public BookmarkController(BookmarkContext context)
        {
            _context = context;
        }

        // GET: api/bookmarks
        [HttpGet]
        public ActionResult<IEnumerable<Bookmark>> Get()
        {
            var bookmarks = _context.Bookmarks;
            return Ok(bookmarks);
        }

        [HttpPost]
        public IActionResult AddBookmark([FromBody] Bookmark bookmark)
        {
            if (ModelState.IsValid)
            {
                _context.Bookmarks.Add(bookmark);

                _context.SaveChanges();

                return Ok(bookmark);
            }

            return BadRequest(ModelState);
        }
    }
}
