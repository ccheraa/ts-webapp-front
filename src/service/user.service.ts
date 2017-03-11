import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';

import { LoaderService } from './loader.service';

// TODO: correct the url in the requests

@Injectable()
export class UserService {
  activity: Subject<any> = new Subject<any>();
  constructor(private http: Http, private loader: LoaderService) {}
  result(action: string, data: any) {
    this.loader.unload(action);
    this.activity.next(data);
  }
  login(username: string, password: string): Subject<any> {
    this.loader.load('login');
    this.http.post('/api/user/login', { username, password}).subscribe(response => this.result('login', response.json().ok && response.json()));
    return this.activity;
  }
  logout(): Observable<any> {
    this.loader.load('logout');
    this.http.post('/api/user/logout', null).subscribe(response => this.result('logout', response.json().ok && response.json()));
    return this.activity;
  }
  register(username: string, password: string): Observable<any> {
    this.http.post('/api/user/register', { username, password}).subscribe(response => console.log(response));
    return this.activity;
  }
  check(post: boolean = false): Observable<any> {
    if (post) {
      this.loader.load('check');
      this.http.post('/api/user/logged', null).subscribe(response => this.result('check', response.json().ok && response.json()));
    }
    return this.activity;
  }
}