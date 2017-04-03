export * from './app/app.component';
import { AppComponent } from './app/app.component';
export * from './table/table.component';
import { TableComponent } from './table/table.component';
export * from './table-editor/table-editor.component';
import { TableEditorComponent } from './table-editor/table-editor.component';
export declare const LIB_COMPONENTS: (typeof AppComponent | typeof TableEditorComponent | typeof TableComponent)[];
import { DialogComponent } from '../service';
export declare const LIB_ENTRY_COMPONENTS: (typeof DialogComponent | typeof TableEditorComponent)[];
