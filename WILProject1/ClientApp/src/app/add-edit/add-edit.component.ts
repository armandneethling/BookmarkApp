import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookmark } from '../Models/bookmark.interface';
import { BookmarkService } from '../Services/bookmark.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})

export class AddEditComponent {
  bookmark: Bookmark = {
    bookmarkID: 0,
    bookmarkName: '',
    categoryID: '',
    languageID: '',
    bookmarkDateAdded: new Date(),
    keywords: '',
    url: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookmarkService: BookmarkService
  ) { }

  onSubmit(form: any): void {
    if (form.valid) {
      console.log(this.bookmark)
      this.bookmarkService.addBookmark(this.bookmark).subscribe(
        (newBookmark: Bookmark) => {
          console.log('Bookmark added successfully:', newBookmark);
          form.reset();

          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error adding bookmark:', error);
        }
      );
    }
  }
}
