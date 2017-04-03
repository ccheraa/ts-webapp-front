export * from './app/app.component';
import { AppComponent } from './app/app.component';
export * from './table/table.component';
import { TableComponent, DataTableComponent } from './table/table.component';
export * from './table-editor/table-editor.component';
import { TableEditorComponent } from './table-editor/table-editor.component';
export const LIB_COMPONENTS = [
  AppComponent,
  TableComponent,
  TableEditorComponent,
  DataTableComponent,
];
import { DialogComponent } from '../service';
export const LIB_ENTRY_COMPONENTS = [
  DialogComponent,
  TableEditorComponent,
];
