var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { template } from './table-editor.component.html';
import { objectAssign } from '@ts-webapp/common';
var TableEditorComponent = (function () {
    function TableEditorComponent(dialog) {
        this.dialog = dialog;
        this.edited = {}; // edited
    }
    TableEditorComponent.prototype.cleanColumns = function () {
        this.data.columns = this.data.columns.filter(function (column) { return !(column.isid || column.auto); });
    };
    TableEditorComponent.prototype.ngOnInit = function () {
        // this.nav.title('TableEditor');
        // this.nav.home(false);
        // this.nav.menu([]);
        if (this.data) {
            console.log(this.data);
            this.cleanColumns();
            objectAssign(this.edited, this.data.row);
        }
    };
    TableEditorComponent.prototype.dateChange = function (column, event) {
        console.log(column, event);
    };
    Object.defineProperty(TableEditorComponent.prototype, "dob", {
        get: function () {
            if (!(this.edited.dob instanceof Date)) {
                this.edited.dob = new Date(this.edited.dob);
            }
            return this.edited.dob.toISOString().substring(0, 10);
        },
        set: function (v) {
            v = v.split('-');
            this.edited.dob.setFullYear(v[0], v[1] - 1, v[2]);
        },
        enumerable: true,
        configurable: true
    });
    TableEditorComponent.prototype.ok = function () {
        this.dialog.close(this.edited);
    };
    TableEditorComponent.prototype.cancel = function () {
        this.dialog.close(this.data.row);
    };
    return TableEditorComponent;
}());
TableEditorComponent = __decorate([
    Component({
        selector: 'app-table-editor',
        template: template,
    }),
    __metadata("design:paramtypes", [MdDialogRef])
], TableEditorComponent);
export { TableEditorComponent };
//# sourceMappingURL=table-editor.component.js.map