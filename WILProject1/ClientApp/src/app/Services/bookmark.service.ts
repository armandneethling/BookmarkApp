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
    return this.http.get<Bookmark[]>(this.baseUrl);
  }

  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.baseUrl, bookmark);
  }

  deleteBookmark(bookmarkId: number): Observable<any> {
    const url = `${this.baseUrl}/${bookmarkId}`;
    return this.http.delete(url);
  }
}
