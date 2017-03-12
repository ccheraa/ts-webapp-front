import { Http } from '@angular/http';
import { Subject } from 'rxjs';
import { Loader } from './base';
import { Multi } from '@ts-webapp/common';
export declare class ModelClient<T> {
    url: string;
    http: Http;
    loader: Loader;
    loaderName: string;
    useLoader(loader: Loader, loaderName: string): void;
    load(id: string): void;
    unload(id: string): void;
    decodeResponse(subject: Subject<any>, response: any): void;
    create(document: T): Subject<T>;
    create(documents: T[]): Subject<T[]>;
    list(conditions?: T, projection?: any, options?: any): Subject<T[]>;
    find(conditions?: T, projection?: any, options?: any): Subject<Multi<T>>;
    count(conditions?: T): Subject<number>;
    get(id: string, projection?: any, options?: any): Subject<T>;
    set(id: string, document: T, options?: any): Subject<T>;
    update(conditions: T, document: T, options?: any): Subject<T>;
    remove(): Subject<number>;
    remove(id?: string): Subject<number>;
    remove(conditions?: T): Subject<number>;
}
