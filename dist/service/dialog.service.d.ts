import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MdDialog, MdDialogRef, ComponentType } from '@angular/material';
import { DialogDef } from '@ts-webapp/common';
export declare class DialogService {
    private dialog;
    private isModal;
    constructor(dialog: MdDialog);
    modal(): this;
    use<T>(component: ComponentType<T>, data?: any, disableClose?: boolean): Observable<any>;
    run(options: DialogDef): Observable<any>;
    error(message: string): Observable<any>;
    error(title: string, message: string): Observable<any>;
    error(title: string, message: string, buttons: any[]): Observable<any>;
    alert(message: string): Observable<any>;
    alert(title: string, message: string): Observable<any>;
    alert(title: string, message: string, buttons: any[]): Observable<any>;
    confirm(message: string): Observable<any>;
    confirm(title: string, message: string): Observable<any>;
    confirm(title: string, message: string, buttons: any[]): Observable<any>;
    ask(message: string): Observable<any>;
    ask(title: string, message: string): Observable<any>;
    ask(title: string, message: string, buttons: any[]): Observable<any>;
}
export declare class DialogComponent implements OnInit {
    dialogRef: MdDialogRef<DialogComponent>;
    options: any;
    constructor(dialogRef: MdDialogRef<DialogComponent>);
    ngOnInit(): void;
    result(id: any): void;
}
