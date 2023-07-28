import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookmark } from '../Models/bookmark.interface';
import { BookmarkService } from '../Services/bookmark.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './app-edit.component.html',
  styleUrls: ['./app-edit.component.css']
})
export class AddEditComponent {
  bookmark: Bookmark = {
    id: 0,
    name: '',
    category: '',
    language: '',
    dateAdded: new Date()
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookmarkService: BookmarkService
  ) { }

  onSubmit(form: any): void {
    if (form.valid) {
      this.bookmarkService.addBookmark(this.bookmark);
      form.reset();
    }
  }
}

