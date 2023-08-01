import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bookmark } from '../Models/bookmark.interface';
import { BookmarkService } from '../Services/bookmark.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  isEditing: boolean = false;
  bookmarkForm!: FormGroup;
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
    private formBuilder: FormBuilder,
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

    this.initForm();
  }

  initForm() {
    this.bookmarkForm = this.formBuilder.group({
      bookmarkName: ['', Validators.required],
      categoryID: ['', Validators.required],
      languageID: ['', Validators.required],
      url: ['', Validators.required],
      keywords: ['', Validators.required]
    });
  }

  getBookmark(bookmarkID: number): void {
    this.bookmarkService.getBookmark(bookmarkID).subscribe(
      (bookmark: Bookmark) => {
        this.bookmark = bookmark;
        this.bookmarkForm.patchValue(bookmark);
      },
      (error) => {
        console.error('Error fetching bookmark:', error);
      }
    );
  }

  onSubmit(): void {
    console.log('Form values:', this.bookmarkForm.value);
    if (this.bookmarkForm.valid) {
      console.log('Form is valid.');
      if (this.isEditing) {
        this.updateBookmark();
      } else {
        this.addBookmark();
      }
    } else {
      console.log('Form is invalid.');
    }
  }

  addBookmark(): void {
    this.bookmarkService.addBookmark(this.bookmarkForm.value).subscribe(
      (createdBookmark: Bookmark) => {
        console.log('Bookmark added successfully:', createdBookmark);
        this.bookmarkForm.reset();
        this.editRouter.navigate(['/']);
      },
      (error) => {
        console.error('Error adding bookmark:', error);
      }
    );
  }

  updateBookmark(): void {
    const updatedBookmark: Bookmark = { ...this.bookmark, ...this.bookmarkForm.value };
    this.bookmarkService.updateBookmark(updatedBookmark).subscribe(
      (bookmark: Bookmark) => {
        console.log('Bookmark updated successfully:', bookmark);
        this.editRouter.navigate(['/']);
      },
      (error) => {
        console.error('Error updating bookmark:', error);
      }
    );
  }
}
