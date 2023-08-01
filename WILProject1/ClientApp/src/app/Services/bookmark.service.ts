import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bookmark } from '../Models/bookmark.interface';

@Injectable({
  providedIn: 'root'
})

export class BookmarkService {
  private readonly baseUrl = 'https://localhost:7158/api/bookmark';

  constructor(private http: HttpClient) { }

  getBookmarks(): Observable<Bookmark[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Bookmark[]>(url);
  }

  getBookmark(bookmarkId: number): Observable<Bookmark> {
    const url = `${this.baseUrl}/${bookmarkId}`;
    return this.http.get<Bookmark>(url);
  }

  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.baseUrl, bookmark);
  }

  updateBookmark(bookmark: Bookmark): Observable<Bookmark> {
    const url = `${this.baseUrl}/${bookmark.bookmarkID}`;
    return this.http.put<Bookmark>(url, bookmark);
  }

  deleteBookmark(bookmarkId: number): Observable<any> {
    console.log('Delete bookmark called with ID:', bookmarkId);
    const url = `${this.baseUrl}/${bookmarkId}`;
    return this.http.delete(url);
  }
}
