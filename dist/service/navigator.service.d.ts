/// <reference types="es6-promise" />
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DialogService } from './dialog.service';
export declare class NavigatorService implements CanDeactivate<Component> {
    private router;
    private dialog;
    private location;
    private url;
    messages: {};
    subscriptions: {};
    observable: Subject<any[]>;
    autoObservable: Subject<any>;
    titleObservable: Subject<string>;
    homeObservable: Subject<boolean>;
    menuObservable: Subject<any[]>;
    canGo: boolean;
    constructor(router: Router, dialog: DialogService, location: Location);
    canDeactivate(component: Component, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
    private subscription(id, message);
    stop(): void;
    reject(): void;
    cancel(id: string): void;
    notify(id: string, subscription: (value: any) => void): any;
    notify(id: string, message: string, subscription: (value: any) => void): any;
    notify(id: string, message: string, confirm: boolean): any;
    resume(): void;
    back(): void;
    goto(...url: any[]): void;
    title(title?: string): Observable<string>;
    home(home?: boolean): Observable<boolean>;
    menu(menu?: any[]): Observable<any[]>;
}
export declare const canDeactivate: typeof NavigatorService[];
