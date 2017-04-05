import { Observable, Subject } from 'rxjs';
export declare class AppService {
    valueMainPane: boolean;
    subjectMainPane: Subject<boolean>;
    valueSidePane: boolean;
    subjectSidePane: Subject<boolean>;
    valueDark: boolean;
    subjectDark: Subject<boolean>;
    valueRTL: boolean;
    subjectRTL: Subject<boolean>;
    checkMainPane(): Observable<boolean>;
    toggleMainPane(): void;
    setMainPane(value: boolean): void;
    getMainPane(): boolean;
    checkSidePane(): Observable<boolean>;
    toggleSidePane(): void;
    setSidePane(value: boolean): void;
    getSidePane(): boolean;
    checkDark(): Observable<boolean>;
    toggleDark(): void;
    setDark(value: boolean): void;
    getDark(): boolean;
    checkRTL(): Observable<boolean>;
    toggleRTL(): void;
    setRTL(value: boolean): void;
    getRTL(): boolean;
}
