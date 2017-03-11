import { Component, Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MdDialog, MdDialogRef, ComponentType } from '@angular/material';

import { DialogClass, DialogDef } from '@ts-webapp/common';

@Injectable()
export class DialogService {
  private isModal = false;
  constructor (private dialog: MdDialog) {}
  modal() {
    this.isModal = true;
    return this;
  }
  use<T>(component: ComponentType<T>, data: any = null, disableClose: boolean = false): Observable<any> {
    let dialog = this.dialog.open(component, { disableClose: disableClose || this.isModal });
    this.isModal = false;
    dialog.componentInstance['data'] = data;
    return dialog.afterClosed();
  }
  run(options: DialogDef): Observable<any> {
    let dialog = this.dialog.open(DialogComponent, { disableClose: options.modal || this.isModal });
    this.isModal = false;
    dialog.componentInstance.options = new DialogClass(options.title, options.message, options.buttons);
    options.buttons = dialog.componentInstance.options.buttons;
    return dialog.afterClosed();
  }
  error(message: string): Observable<any>;
  error(title: string, message: string): Observable<any>;
  error(title: string, message: string, buttons: any[]): Observable<any>;
  error(title: string, message?: string, buttons: any[] = ['OK']): Observable<any> {
    return this.alert(title, message);
  }
  alert(message: string): Observable<any>;
  alert(title: string, message: string): Observable<any>;
  alert(title: string, message: string, buttons: any[]): Observable<any>;
  alert(title: string, message?: string, buttons: any[] = ['OK']): Observable<any> {
    if (!message) {
      message = title;
      title = '';
    }
    return this.run({ title, message, buttons: ['OK'] });
  }
  confirm(message: string): Observable<any>;
  confirm(title: string, message: string): Observable<any>;
  confirm(title: string, message: string, buttons: any[]): Observable<any>;
  confirm(title: string, message?: string, buttons: any[] = ['OK', 'Cancel']): Observable<any> {
    let result = new Subject<any>();
    if (!message) {
      message = title;
      title = '';
    }
    let options = { title, message, buttons };
    this.run(options).subscribe(res => {
      (res === options.buttons[0].id) ? result.next(true) : result.next(false);
      result.complete();
    });
    return result;
  }
  ask(message: string): Observable<any>;
  ask(title: string, message: string): Observable<any>;
  ask(title: string, message: string, buttons: any[]): Observable<any>;
  ask(title: string, message?: string, buttons: any[] = ['Yes', 'No', 'Cancel']): Observable<any> {
    if (!message) {
      message = title;
      title = '';
    }
    return this.run({ title, message, buttons: ['Yes', 'No', 'Cancel'] });
  }
}

@Component({
  selector: 'app-dialog',
  template: `
<md-card is-dialog>
  <md-card-title *ngIf="options.title">{{options.title}}</md-card-title>
  <md-card-content>
    <p>{{options.message}}</p>
  </md-card-content>
  <md-card-actions ff>
    <span fl></span>
    <button md-button [attr.md-button]="button.mini ? null : ''" [attr.md-icon-button]="button.mini ? '' : null" [mdTooltip]="button.mini && button.text" *ngFor="let button of options.buttons" (click)="result(button.id)" color="primary">
      <md-icon *ngIf="button.icon">{{button.icon}}</md-icon>
      <span *ngIf="!button.mini">{{button.text}}</span>
    </button>
    <span *ngIf="options.buttons.length === 1" fl></span>
  </md-card-actions>
</md-card>
`,
})
export class DialogComponent implements OnInit {
  options = this.dialogRef['options'];
  constructor(public dialogRef: MdDialogRef<DialogComponent>) {}
  ngOnInit() {
    this.options.buttons = this.options.buttons.slice().reverse();
  }
  result(id) {
    this.dialogRef.close(id);
  }
}
