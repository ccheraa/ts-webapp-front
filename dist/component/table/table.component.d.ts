/// <reference types="es6-promise" />
import { OnInit, EventEmitter } from '@angular/core';
import { ComponentType } from '@angular/material';
import { NavigatorService, DialogService } from '../../service';
import { TableEditorComponent } from '../table-editor/table-editor.component';
import { Subject } from 'rxjs';
import { ModelClient } from '../../db';
export declare type Column = {
    isid?: boolean;
    name?: string;
    text?: string;
    type?: string;
    main?: boolean;
    check?: boolean;
    sort?: boolean;
    center?: boolean;
    centerData?: boolean;
    placeholder?: string;
    read?: (item: any) => any;
    auto?: boolean;
    editOnClick?: boolean;
    yesno?: [string, string];
    icons?: [string, string];
};
export declare type Data = {
    row: any;
    columns: Column[];
};
export declare class TableComponent implements OnInit {
    private nav;
    private dialog;
    selectionChange: EventEmitter<number>;
    data: any[];
    selection: any;
    config: {
        table: string;
        checkbox?: boolean;
        createID?: (item: any) => Promise<any>;
        edit?: ComponentType<any>;
        main?: Column;
        columns: Column[];
    };
    defaultEdit: typeof TableEditorComponent;
    pagesOption: number[];
    limit: number;
    pager: {
        limit: number;
        pages: number;
        current: number;
        count: number;
        pagesCount: number;
        goto: (page: number) => boolean;
        setCount: (count: number) => void;
        setLimit: (limit: number) => boolean;
        next: () => boolean;
        prev: () => boolean;
    };
    items: any[];
    sortField: any;
    sortInverse: boolean;
    allSelected: boolean;
    selectedCount: number;
    selected: any;
    shaded: boolean;
    scrollValue: number;
    showSearch: boolean;
    searchValue: any;
    keypress: Subject<any>;
    tableBody: any;
    constructor(nav: NavigatorService, dialog: DialogService);
    ngOnInit(): void;
    onScroll(): void;
    refresh(res?: any): void;
    next(): void;
    prev(): void;
    limitChange(): void;
    select(item: any): void;
    sort(field: any): void;
    doDelete(item: any): Promise<any>;
    delete(item: any): void;
    doEdit(isNew: boolean, res: any, row?: any): Promise<any>;
    edit(row?: any): void;
    click(row: any, column: any): void;
}
export declare class DataTableComponent extends TableComponent {
    model: ModelClient<any>;
    constructor(nav: NavigatorService, dialog: DialogService);
    ngOnInit(): void;
    refresh(res?: any): void;
    doDelete(item: any): Promise<any>;
    doEdit(isNew: boolean, res: any, row?: any): Promise<any>;
}
