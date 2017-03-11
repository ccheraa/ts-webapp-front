import { Observable, Subject } from 'rxjs';
import { Loader } from '../db';
export declare class LoaderService implements Loader {
    private loading;
    result: Subject<boolean>;
    load(action: string, cb?: Function): Observable<boolean>;
    unload(action: string): Observable<boolean>;
    check(): Observable<boolean>;
}
