import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RssServiceService {

  constructor(private http: HttpClient) {}

  getRssFeed(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' });
  }
}
