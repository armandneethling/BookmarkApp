import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Bookmark } from '../Models/bookmark.interface';
import { BookmarkService } from '../Services/bookmark.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  isEditing: boolean = false;
  bookmark: Bookmark = {
    bookmarkID: 0,
    bookmarkName: '',
    categoryID: '',
    languageID: '',
    bookmarkDateAdded: new Date(),
    url: '',
    keywords: ''
  };

  constructor(
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService,
    private editRouter: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const bookmarkID = params.get('id');
      if (bookmarkID !== null) {
        const id = +bookmarkID;
        this.isEditing = true;
        this.getBookmark(id);
      } else {
        this.isEditing = false;
      }
    });
  }

  getBookmark(bookmarkID: number): void {
    this.bookmarkService.getBookmark(bookmarkID).subscribe(
      (bookmark: Bookmark) => {
        this.bookmark = bookmark;
        console.log(bookmark)
      },
      (error) => {
        console.error('Error fetching bookmark:', error);
      }
    );
  }

  onSubmit(form: any): void {
    if (form.valid) {
      if (this.isEditing) {
        this.updateBookmark(form);
      } else {
        this.addBookmark(form);
      }
    }
  }

  addBookmark(form: any): void {
    this.bookmarkService.addBookmark(this.bookmark).subscribe(
      (newBookmark: Bookmark) => {
        console.log('Bookmark added successfully:', newBookmark);
        form.reset();
        this.editRouter.navigate(['/']);
      },
      (error) => {
        console.error('Error adding bookmark:', error);
      }
    );
  }

  updateBookmark(form: any): void {
    this.bookmarkService.updateBookmark(this.bookmark).subscribe(
      (updatedBookmark: Bookmark) => {
        console.log('Bookmark updated successfully:', updatedBookmark);
        form.reset();
        this.editRouter.navigate(['/']);
      },
      (error) => {
        console.error('Error updating bookmark:', error);
      }
    );
  }
}
