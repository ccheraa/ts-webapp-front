import { Injectable } from '@angular/core';
import { MenuItemClass } from '@ts-webapp/common';
// import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';

let dummy = [
  { text: 'New offer', icon: 'library_add', id: 'offer'},
  { text: 'Offers', icon: 'library_books', id: 'offers' },
  { text: 'Scan a document', icon: 'scanner', id: 'scan'},
  { text: 'Test', icon: 'warning', id: 'test'},
  { text: 'Clients', icon: 'group', id: 'clients'},
];
@Injectable()
export class MenuService {
  // constructor(private http: Http) {}
  getItems(): Observable<MenuItemClass[]> {
    let subject = new Subject<MenuItemClass[]>();
    setTimeout(() => {
      subject.next(<MenuItemClass[]>dummy);
      subject.complete();
    }, 1);
    return subject;
  }
}