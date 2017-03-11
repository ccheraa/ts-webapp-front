"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
// import { Http } from '@angular/http';
var rxjs_1 = require("rxjs");
var dummy = [
    { text: 'New offer', icon: 'library_add', id: 'offer' },
    { text: 'Offers', icon: 'library_books', id: 'offers' },
    { text: 'Scan a document', icon: 'scanner', id: 'scan' },
    { text: 'Test', icon: 'warning', id: 'test' },
    { text: 'Clients', icon: 'group', id: 'clients' },
];
var MenuService = (function () {
    function MenuService() {
    }
    // constructor(private http: Http) {}
    MenuService.prototype.getItems = function () {
        var subject = new rxjs_1.Subject();
        setTimeout(function () {
            subject.next(dummy);
            subject.complete();
        }, 1);
        return subject;
    };
    return MenuService;
}());
MenuService = __decorate([
    core_1.Injectable()
], MenuService);
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map