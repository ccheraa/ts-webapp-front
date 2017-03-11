import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { LoaderService } from './loader.service';
export declare class UserService {
    private http;
    private loader;
    activity: Subject<any>;
    constructor(http: Http, loader: LoaderService);
    result(action: string, data: any): void;
    login(username: string, password: string): Subject<any>;
    logout(): Observable<any>;
    register(username: string, password: string): Observable<any>;
    check(post?: boolean): Observable<any>;
}
