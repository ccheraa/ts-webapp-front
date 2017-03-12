import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { Loader } from './base';
import { Multi, DBUrl } from '@ts-webapp/common';
export class ModelClient<T> {
  public url = '/';
  public http: Http;
  loader: Loader;
  loaderName: string;
  useLoader(loader: Loader, loaderName: string) {
    this.loader = loader;
    this.loaderName = loaderName;
  }
  load(id: string) {
    if (this.loader) {
      this.loader.load(id);
    }
  }
  unload(id: string) {
    if (this.loader) {
      this.loader.unload(id);
    }
  }
  decodeResponse(subject: Subject<any>, response: any) {
    if (response.json) {
      let json = response.json();
      if (json.ok) {
        subject.next(json.data);
      } else {
        subject.error(json.errors);
      }
    } else {
      subject.error(['NO JSON']);
    }
    subject.complete();
  }

  // C
  create(document: T): Subject<T>;
  create(documents: T[]): Subject<T[]>;
  create(document: T | T[]): Subject<T | T[]> {
    this.load('create:' + this.loaderName);
    let result: Subject<T> = new Subject();
    this.http.post(DBUrl() + this.url, { document }).subscribe(
      response => {
        this.unload('create:' + this.loaderName);
        this.decodeResponse(result, response);
      },
      err => {
        this.unload('create:' + this.loaderName);
        result.error(err);
      }
    );
    return result;
  }

  // // R
  list(conditions?: T, projection?: any, options?: any): Subject<T[]> {
    this.load('list:' + this.loaderName);
    let result: Subject<T[]> = new Subject();
    this.http.post(DBUrl() + this.url, { conditions, projection, options}).subscribe(
      response => {
        this.unload('list:' + this.loaderName);
        this.decodeResponse(result, response);
      },
      err => {
        this.unload('list:' + this.loaderName);
        result.error(err);
      }
    );
    return result;
  }
  find(conditions?: T, projection?: any, options?: any): Subject<Multi<T>> {
    this.load('find:' + this.loaderName);
    let result: Subject<Multi<T>> = new Subject();
    this.http.post(DBUrl() + this.url + '/find', { conditions, projection, options}).subscribe(
      response => {
        this.unload('find:' + this.loaderName);
        this.decodeResponse(result, response);
      },
      err => {
        this.unload('find:' + this.loaderName);
        result.error(err);
      }
    );
    return result;
  }
  count(conditions?: T): Subject<number> {
    // TODO: conditions not used
    this.load('count:' + this.loaderName);
    let result: Subject<number> = new Subject();
    this.http.get(DBUrl() + this.url + '/count').subscribe(
      response => {
        this.unload('count:' + this.loaderName);
        this.decodeResponse(result, response);
      },
      err => {
        this.unload('count:' + this.loaderName);
        result.error(err);
      }
    );
    return result;
  }
  get(id: string, projection?: any, options?: any): Subject<T> {
    // TODO: projection and options not used
    this.load('get:' + this.loaderName);
    let result: Subject<T> = new Subject();
    this.http.get(DBUrl() + this.url + '/' + id).subscribe(
      response => {
        this.unload('get:' + this.loaderName);
        this.decodeResponse(result, response);
      },
      err => {
        this.unload('get:' + this.loaderName);
        result.error(err);
      }
    );
    return result;
  }
  // // U
  set(id: string, document: T, options?: any): Subject<T> {
    // TODO: options not used
    this.load('set:' + this.loaderName);
    let result: Subject<T> = new Subject();
    this.http.post(DBUrl() + this.url + '/' + id, { document }).subscribe(
      response => {
        this.unload('set:' + this.loaderName);
        this.decodeResponse(result, response);
      },
      err => {
        this.unload('set:' + this.loaderName);
        result.error(err);
      }
    );
    return result;
  }
  update(conditions: T, document: T, options?: any): Subject<T> {
    // TODO: options not used
    this.load('update:' + this.loaderName);
    let result: Subject<T> = new Subject();
    this.http.put(DBUrl() + this.url, { conditions, document }).subscribe(
      response => {
        this.unload('update:' + this.loaderName);
        this.decodeResponse(result, response);
      },
      err => {
        this.unload('update:' + this.loaderName);
        result.error(err);
      }
    );
    return result;
  }
  // // D
  remove(): Subject<number>;
  remove(id?: string): Subject<number>;
  remove(conditions?: T): Subject<number>;
  remove(conditions?: string | T): Subject<number> {
    this.load('remove:' + this.loaderName);
    let result: Subject<number> = new Subject();
    let isString = typeof conditions === 'string';
    this.http.delete(
      DBUrl() + this.url + (isString ? '/' + <string>conditions : ''),
      isString ? null : { body: { conditions: conditions } }
    ).subscribe(
      response => {
        this.unload('remove:' + this.loaderName);
        this.decodeResponse(result, response);
      },
      err => {
        this.unload('remove:' + this.loaderName);
        result.error(err);
      }
    );
    return result;
  }
}