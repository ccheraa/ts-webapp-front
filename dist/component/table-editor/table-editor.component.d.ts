import { OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Data } from '../table/table.component';
export declare class TableEditorComponent implements OnInit {
    private dialog;
    data: Data;
    edited: any;
    cleanColumns(): void;
    constructor(dialog: MdDialogRef<TableEditorComponent>);
    ngOnInit(): void;
    dateChange(column: any, event: any): void;
    dob: any;
    ok(): void;
    cancel(): void;
}
