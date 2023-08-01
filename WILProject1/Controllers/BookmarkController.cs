using Microsoft.AspNetCore.Mvc;
using DAL;

namespace WIL_Project_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            try
            {
                var bookmarks = _context.Bookmarks;
                return Ok(bookmarks);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error while retrieving bookmarks: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        // GET: api/bookmark/{id}
        [HttpGet("{id}")]
        public ActionResult GetbyID(int id)
        {
            try
            {
                var bookmark = _context.Bookmarks.Find(id);
                if (bookmark == null)
                {
                    return NotFound();
                }
                return Ok(bookmark);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error while retrieving bookmark with ID {id}: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        // POST: api/bookmark
        [HttpPost]
        public IActionResult AddBookmark([FromBody] Bookmark bookmark)
        {
            try
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
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error while adding a bookmark: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        // DELETE: api/bookmark/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteBookmark(int id)
        {
            try
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
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error while deleting bookmark with ID {id}: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        // PUT: api/bookmark/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateBookmark(int id, [FromBody] Bookmark bookmark)
        {
            try
            {
                var existingBookmark = _context.Bookmarks.Find(id);
                if (existingBookmark == null)
                {
                    return NotFound();
                }

                existingBookmark.BookmarkName = bookmark.BookmarkName;
                existingBookmark.CategoryID = bookmark.CategoryID;
                existingBookmark.LanguageID = bookmark.LanguageID;
                existingBookmark.Url = bookmark.Url;
                existingBookmark.Keywords = bookmark.Keywords;

                _context.Bookmarks.Update(existingBookmark);
                _context.SaveChanges();

                return Ok(existingBookmark);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error while updating bookmark with ID {id}: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}