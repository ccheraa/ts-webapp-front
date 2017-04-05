import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AppService {
  valueMainPane = false;
  subjectMainPane = new Subject<boolean>();
  valueSidePane = false;
  subjectSidePane = new Subject<boolean>();
  valueDark = false;
  subjectDark = new Subject<boolean>();
  valueRTL = false;
  subjectRTL = new Subject<boolean>();
  // constructor(private http: Http) {}
  checkMainPane(): Observable<boolean> {
    return this.subjectMainPane;
  }
  toggleMainPane(): void {
    this.valueMainPane = !this.valueMainPane;
    this.subjectMainPane.next(this.valueMainPane);
  }
  setMainPane(value: boolean): void {
    if (this.valueMainPane !== value) {
      this.valueMainPane = value;
      this.subjectMainPane.next(this.valueMainPane);
    }
  }
  getMainPane(): boolean {
    return this.valueMainPane;
  }
  checkSidePane(): Observable<boolean> {
    return this.subjectSidePane;
  }
  toggleSidePane(): void {
    this.valueSidePane = !this.valueSidePane;
    this.subjectSidePane.next(this.valueSidePane);
  }
  setSidePane(value: boolean): void {
    if (this.valueSidePane !== value) {
      this.valueSidePane = value;
      this.subjectSidePane.next(this.valueSidePane);
    }
  }
  getSidePane(): boolean {
    return this.valueSidePane;
  }
  checkDark(): Observable<boolean> {
    return this.subjectDark;
  }
  toggleDark(): void {
    this.valueDark = !this.valueDark;
    this.subjectDark.next(this.valueDark);
  }
  setDark(value: boolean): void {
    if (this.valueDark !== value) {
      this.valueDark = value;
      this.subjectDark.next(this.valueDark);
    }
  }
  getDark(): boolean {
    return this.valueDark;
  }
  checkRTL(): Observable<boolean> {
    return this.subjectRTL;
  }
  toggleRTL(): void {
    this.valueRTL = !this.valueRTL;
    this.subjectRTL.next(this.valueRTL);
  }
  setRTL(value: boolean): void {
    if (this.valueRTL !== value) {
      this.valueRTL = value;
      this.subjectRTL.next(this.valueRTL);
    }
  }
  getRTL(): boolean {
    return this.valueRTL;
  }
}