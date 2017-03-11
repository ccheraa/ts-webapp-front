import { Injectable, Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DialogService } from './dialog.service';

@Injectable()
export class NavigatorService implements CanDeactivate<Component> {
  private url: any[] = [];
  // private safeUrl: any[] = [];
  messages = {};
  subscriptions = {};
  public observable: Subject<any[]> = new Subject<any[]>();
  public autoObservable: Subject<any> = new Subject<any>();
  public titleObservable: Subject<string> = new Subject<string>();
  public homeObservable: Subject<boolean> = new Subject<boolean>();
  public menuObservable: Subject<any[]> = new Subject<any[]>();
  public canGo = false;
  constructor(private router: Router, private dialog: DialogService, private location: Location) {
    // window.onbeforeunload = (e) => {
    //   let messages = Object.keys(this.messages)
    //     .map(index => this.messages[index])
    //     .filter(message => message !== '')
    //     .join('\n');
    //   return messages.length ? messages : null;
    // };
  }
  canDeactivate(
    component: Component,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    // console.log(component, route, state);
    // this.safeUrl = this.url;
    this.url = [];
    this.canGo = true;
    this.observable.next();
    if (this.canGo) {
      this.home(false);
      return true;
    } else {
      let me = this;
      return this.autoObservable;
    }
    // return this.permissions.canDeactivate(this.currentUser, route.params.id);
  }
  private subscription(id: string, message: string): (value: any) => void {
    return (value: any) => {
      this.canGo = false;
      this.dialog.confirm(message).subscribe(ok => {
        if (ok) {
          this.cancel(id);
          this.resume();
        } else {
          this.reject();
        }
      });
    };
  }
  stop() {
    this.canGo = false;
  }
  reject() {
    // console.log(this.url, this.safeUrl);
    // this.url = this.safeUrl;
    this.autoObservable.next(false);
  }
  cancel(id: string) {
    if (this.subscriptions[id] && this.subscriptions[id].unsubscribe) {
      this.subscriptions[id].unsubscribe();
    }
    delete(this.subscriptions[id]);
    delete(this.messages[id]);
  }
  notify(id: string, subscription: (value: any) => void);
  notify(id: string, message: string, subscription: (value: any) => void);
  notify(id: string, message: string, confirm: boolean);
  notify(id: string, message: string | ((value: any) => void), subscription: (boolean | ((value: any) => void)) = false) {
    if (typeof message === 'function') {
      subscription = message;
      message = '';
    } else if (typeof subscription === 'boolean') {
      subscription = this.subscription(id, message);
    }
    this.messages[id] = message;
    this.subscriptions[id] = this.observable.subscribe(<(value: any) => void>subscription);
    console.log(this.messages, this.subscriptions);
  }
  resume() {
    this.goto(...this.url);
  }
  back() {
    this.location.back();
  }
  goto(...url: any[]) {
    // this.url = url;
    // this.canGo = true;
    // this.observable.next(url);
    // if (this.canGo) {
      if (url.length) {
        this.router.navigate(url);
      } else {
        this.home(false);
        this.autoObservable.next(true);
      }
    // }
  }
  title(title?: string): Observable<string>  {
    if (!(title === null || title === undefined)) {
      this.titleObservable.next(title);
    } else {
      return this.titleObservable;
    }
  }
  home(home?: boolean): Observable<boolean>  {
    if (!(home === null || home === undefined)) {
      this.homeObservable.next(home);
    } else {
      return this.homeObservable;
    }
  }
  menu(menu?: any[]): Observable<any[]>  {
    if (!(menu === null || menu === undefined)) {
      this.menuObservable.next(menu);
    } else {
      return this.menuObservable;
    }
  }
}

export const canDeactivate = [NavigatorService];