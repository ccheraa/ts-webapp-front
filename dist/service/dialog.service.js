"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var material_1 = require("@angular/material");
var common_1 = require("@ts-webapp/common");
var DialogService = (function () {
    function DialogService(dialog) {
        this.dialog = dialog;
        this.isModal = false;
    }
    DialogService.prototype.modal = function () {
        this.isModal = true;
        return this;
    };
    DialogService.prototype.use = function (component, data, disableClose) {
        if (data === void 0) { data = null; }
        if (disableClose === void 0) { disableClose = false; }
        var dialog = this.dialog.open(component, { disableClose: disableClose || this.isModal });
        this.isModal = false;
        dialog.componentInstance['data'] = data;
        return dialog.afterClosed();
    };
    DialogService.prototype.run = function (options) {
        var dialog = this.dialog.open(DialogComponent, { disableClose: options.modal || this.isModal });
        this.isModal = false;
        dialog.componentInstance.options = new common_1.DialogClass(options.title, options.message, options.buttons);
        options.buttons = dialog.componentInstance.options.buttons;
        return dialog.afterClosed();
    };
    DialogService.prototype.error = function (title, message, buttons) {
        if (buttons === void 0) { buttons = ['OK']; }
        return this.alert(title, message);
    };
    DialogService.prototype.alert = function (title, message, buttons) {
        if (buttons === void 0) { buttons = ['OK']; }
        if (!message) {
            message = title;
            title = '';
        }
        return this.run({ title: title, message: message, buttons: ['OK'] });
    };
    DialogService.prototype.confirm = function (title, message, buttons) {
        if (buttons === void 0) { buttons = ['OK', 'Cancel']; }
        var result = new rxjs_1.Subject();
        if (!message) {
            message = title;
            title = '';
        }
        var options = { title: title, message: message, buttons: buttons };
        this.run(options).subscribe(function (res) {
            (res === options.buttons[0].id) ? result.next(true) : result.next(false);
            result.complete();
        });
        return result;
    };
    DialogService.prototype.ask = function (title, message, buttons) {
        if (buttons === void 0) { buttons = ['Yes', 'No', 'Cancel']; }
        if (!message) {
            message = title;
            title = '';
        }
        return this.run({ title: title, message: message, buttons: ['Yes', 'No', 'Cancel'] });
    };
    return DialogService;
}());
DialogService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [material_1.MdDialog])
], DialogService);
exports.DialogService = DialogService;
var DialogComponent = (function () {
    function DialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.options = this.dialogRef['options'];
    }
    DialogComponent.prototype.ngOnInit = function () {
        this.options.buttons = this.options.buttons.slice().reverse();
    };
    DialogComponent.prototype.result = function (id) {
        this.dialogRef.close(id);
    };
    return DialogComponent;
}());
DialogComponent = __decorate([
    core_1.Component({
        selector: 'app-dialog',
        template: "\n<md-card is-dialog>\n  <md-card-title *ngIf=\"options.title\">{{options.title}}</md-card-title>\n  <md-card-content>\n    <p>{{options.message}}</p>\n  </md-card-content>\n  <md-card-actions ff>\n    <span fl></span>\n    <button md-button [attr.md-button]=\"button.mini ? null : ''\" [attr.md-icon-button]=\"button.mini ? '' : null\" [mdTooltip]=\"button.mini && button.text\" *ngFor=\"let button of options.buttons\" (click)=\"result(button.id)\" color=\"primary\">\n      <md-icon *ngIf=\"button.icon\">{{button.icon}}</md-icon>\n      <span *ngIf=\"!button.mini\">{{button.text}}</span>\n    </button>\n    <span *ngIf=\"options.buttons.length === 1\" fl></span>\n  </md-card-actions>\n</md-card>\n",
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef])
], DialogComponent);
exports.DialogComponent = DialogComponent;
//# sourceMappingURL=dialog.service.js.map