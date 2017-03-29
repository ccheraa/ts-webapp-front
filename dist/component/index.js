"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./app/app.component"));
var app_component_1 = require("./app/app.component");
__export(require("./table/table.component"));
var table_component_1 = require("./table/table.component");
__export(require("./table-editor/table-editor.component"));
var table_editor_component_1 = require("./table-editor/table-editor.component");
exports.LIB_COMPONENTS = [
    app_component_1.AppComponent,
    table_component_1.TableComponent,
    table_editor_component_1.TableEditorComponent,
    table_component_1.DataTableComponent,
];
var service_1 = require("../service");
exports.LIB_ENTRY_COMPONENTS = [
    service_1.DialogComponent,
    table_editor_component_1.TableEditorComponent,
];
//# sourceMappingURL=index.js.map