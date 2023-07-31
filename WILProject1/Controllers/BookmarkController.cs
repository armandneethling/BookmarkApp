using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
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

        // GET: api/bookmark
        [HttpGet]
        public ActionResult<IEnumerable<Bookmark>> Get()
        {
            var bookmarks = _context.Bookmarks;
            return Ok(bookmarks);
        }

        // POST: api/bookmark
        [HttpPost]
        public IActionResult AddBookmark([FromBody] Bookmark bookmark)
        {
            Console.WriteLine($"Received bookmark: {bookmark.BookmarkName}, Category: {bookmark.CategoryID}, Language: {bookmark.LanguageID}, URL: {bookmark.Url}, Keywords: {bookmark.Keywords}");
            if (ModelState.IsValid)
            {
                _context.Bookmarks.Add(bookmark);
                _context.SaveChanges();
                return Ok(bookmark);
            }

            // Log the ModelState errors
            foreach (var modelStateEntry in ModelState.Values)
            {
                foreach (var error in modelStateEntry.Errors)
                {
                    // Log the error message
                    Console.WriteLine(error.ErrorMessage);
                }
            }

            return BadRequest(ModelState);
        }

        // DELETE: api/bookmark/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteBookmark(int id)
        {
            var bookmark = _context.Bookmarks.Find(id);
            if (bookmark == null)
            {
                return NotFound();
            }

            _context.Bookmarks.Remove(bookmark);
            _context.SaveChanges();

            return Ok(bookmark);
        }
    }
}