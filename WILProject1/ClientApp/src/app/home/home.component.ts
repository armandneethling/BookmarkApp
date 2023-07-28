import { Component } from '@angular/core';
import { Bookmark } from '../Models/bookmark.interface';
import { BookmarkService } from '../Services/bookmark.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  bookmarks: Bookmark[];

  constructor(private bookmarkService: BookmarkService) {
    this.bookmarks = this.bookmarkService.getAllBookmarks(); // Initialize the bookmarks from the service
  }

  deleteBookmark(bookmarkId: number): void {
    // Call the deleteBookmark method from the service
    this.bookmarkService.deleteBookmark(bookmarkId);
    // After deletion, update the bookmarks array in the component
    this.bookmarks = this.bookmarkService.getAllBookmarks();
  }
}
