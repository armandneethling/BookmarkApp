using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class BookmarkContext : DbContext
    {
        public DbSet<Bookmark> Bookmarks { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Keyword> Keywords { get; set; }
    }

    public class Bookmark
    {
        public int BookmarkID { get; set; }
        public string BookmarkName { get; set; }
        public int CategoryID { get; set; }
        public int LanguageID { get; set; }
        public DateTime BookmarkDateAdded { get; set; } = DateTime.Now;

    }

    public class Language
    {
        public int LanguageID { get; set; }
        public string LanguageName { get; set; }
        public DateTime LanguageDateAdded { get; set; } = DateTime.Now;

    }

    public class Category
    {
        public int CategoryID { get; set; }
        public int CategoryName { get; set; }
        public DateTime CategoryDateAdded { get; set; } = DateTime.Now;

    }

    public class Keyword
    {
        public int KeywordID { get; set; }
        public string KeywordName { get; set; }
        public int BookmarkID { get; set; }
        public DateTime KeywordDateAdded { get; set; } = DateTime.Now;

    }
}