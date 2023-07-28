import { Injectable } from '@angular/core';
import { Bookmark } from '../Models/bookmark.interface';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private bookmarks: Bookmark[] = [];

  getAllBookmarks(): Bookmark[] {
    return this.bookmarks;
  }

  getBookmarkById(id: number): Bookmark | undefined {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  }

  addBookmark(bookmark: Bookmark): void {
    bookmark.id = this.generateUniqueId();
    this.bookmarks.push(bookmark);
  }

  updateBookmark(updatedBookmark: Bookmark): void {
    const index = this.bookmarks.findIndex(b => b.id === updatedBookmark.id);
    if (index !== -1) {
      this.bookmarks[index] = updatedBookmark;
    }
  }

  deleteBookmark(id: number): void {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  }

  // Generate a unique ID for a new bookmark
  private generateUniqueId(): number {
    let maxId = 0;
    this.bookmarks.forEach(bookmark => {
      if (bookmark.id > maxId) {
        maxId = bookmark.id;
      }
    });
    return maxId + 1;
  }
}
