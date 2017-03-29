import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Data } from '../table/table.component'
import { template } from './table-editor.component.html';

@Component({
  selector: 'app-table-editor',
  template,
  // styleUrls: ['./table-editor.component.scss']
})
export class TableEditorComponent implements OnInit {
  data: Data; // passed
  edited: any = {}; // edited
  cleanColumns() {
    this.data.columns = this.data.columns.filter(column => !(column.isid || column.auto));
  }
  constructor(private dialog: MdDialogRef<TableEditorComponent>) { }
  ngOnInit() {
    // this.nav.title('TableEditor');
    // this.nav.home(false);
    // this.nav.menu([]);
    if (this.data) {
      console.log(this.data);
      this.cleanColumns();
      this.edited.assign(this.data.row);
    }
  }

  dateChange(column, event) {
    console.log(column, event);
  }

  set dob(v: any) {
    v = v.split('-');
    this.edited.dob.setFullYear(v[0], v[1] - 1, v[2]);
  }
  get dob() {
    if (!(this.edited.dob instanceof Date)) {
      this.edited.dob = new Date(this.edited.dob);
    }
    return this.edited.dob.toISOString().substring(0, 10);
  }
  ok() {
    this.dialog.close(this.edited);
  }
  cancel() {
    this.dialog.close(this.data.row);
  }
}
