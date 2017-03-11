import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Loader } from '../db';
function findIndex(array: any[], callback) {
  if (array === null) {
    throw new TypeError('Array.prototype.findIndex called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }
  var list = Object(array);
  var length = list.length >>> 0;
  var arrayArg = arguments[1];
  for (var i = 0; i < length; i++) {
    if ( callback.call(arrayArg, list[i], i, list) ) {
      return i;
    }
  }
  return -1;
}
@Injectable()
export class LoaderService implements Loader {
  private loading: { action: string, cb: Function}[] = [];
  public result: Subject<boolean> = new Subject<boolean>();
  load(action: string, cb?: Function): Observable<boolean> {
    console.log('loading: ' + action + '...');
    if (findIndex(this.loading, loading => loading.action === action) < 0) {
      this.loading.push({
        action,
        cb: cb
      });
    }
    return this.check();
  }
  unload(action: string): Observable<boolean> {
    console.log('unloading: ' + action + '...');
    let found = findIndex(this.loading, loading => loading.action === action);
    if (found > -1) {
      if (this.loading[found].cb) {
        this.loading[found].cb();
      }
      this.loading.splice(found, 1);
    }
    return this.check();
  }
  check(): Observable<boolean>  {
    this.result.next(this.loading.length > 0);
    return this.result;
  }
}
