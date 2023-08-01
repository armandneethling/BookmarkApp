import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bookmark } from '../Models/bookmark.interface';
import { BookmarkService } from '../Services/bookmark.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bookmarks: Bookmark[] = [];

  constructor(
    private bookmarkService: BookmarkService,
    private homeRouter: Router
  ) { }

  ngOnInit(): void {
    this.fetchBookmarks();
  }

  fetchBookmarks(): void {
    this.bookmarkService.getBookmarks().subscribe(
      (bookmarks: Bookmark[]) => {
        this.bookmarks = bookmarks;
      },
      (error) => {
        console.error('Error fetching bookmarks:', error);
      }
    );
  }

  deleteBookmark(bookmarkId: number): void {
    console.log('Deleting bookmark with ID:', bookmarkId);
    this.bookmarkService.deleteBookmark(bookmarkId).subscribe(
      () => {
        this.fetchBookmarks();
      },
      (error) => {
        console.error('Error deleting bookmark:', error);
        console.log(error);
      }
    );
  }

  editBookmark(bookmarkID: number): void {
    this.homeRouter.navigate(['/add-edit', bookmarkID]);
  }
}
