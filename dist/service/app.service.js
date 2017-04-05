var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var AppService = (function () {
    function AppService() {
        this.valueMainPane = false;
        this.subjectMainPane = new Subject();
        this.valueSidePane = false;
        this.subjectSidePane = new Subject();
        this.valueDark = false;
        this.subjectDark = new Subject();
        this.valueRTL = false;
        this.subjectRTL = new Subject();
    }
    // constructor(private http: Http) {}
    AppService.prototype.checkMainPane = function () {
        return this.subjectMainPane;
    };
    AppService.prototype.toggleMainPane = function () {
        this.valueMainPane = !this.valueMainPane;
        this.subjectMainPane.next(this.valueMainPane);
    };
    AppService.prototype.setMainPane = function (value) {
        if (this.valueMainPane !== value) {
            this.valueMainPane = value;
            this.subjectMainPane.next(this.valueMainPane);
        }
    };
    AppService.prototype.getMainPane = function () {
        return this.valueMainPane;
    };
    AppService.prototype.checkSidePane = function () {
        return this.subjectSidePane;
    };
    AppService.prototype.toggleSidePane = function () {
        this.valueSidePane = !this.valueSidePane;
        this.subjectSidePane.next(this.valueSidePane);
    };
    AppService.prototype.setSidePane = function (value) {
        if (this.valueSidePane !== value) {
            this.valueSidePane = value;
            this.subjectSidePane.next(this.valueSidePane);
        }
    };
    AppService.prototype.getSidePane = function () {
        return this.valueSidePane;
    };
    AppService.prototype.checkDark = function () {
        return this.subjectDark;
    };
    AppService.prototype.toggleDark = function () {
        this.valueDark = !this.valueDark;
        this.subjectDark.next(this.valueDark);
    };
    AppService.prototype.setDark = function (value) {
        if (this.valueDark !== value) {
            this.valueDark = value;
            this.subjectDark.next(this.valueDark);
        }
    };
    AppService.prototype.getDark = function () {
        return this.valueDark;
    };
    AppService.prototype.checkRTL = function () {
        return this.subjectRTL;
    };
    AppService.prototype.toggleRTL = function () {
        this.valueRTL = !this.valueRTL;
        this.subjectRTL.next(this.valueRTL);
    };
    AppService.prototype.setRTL = function (value) {
        if (this.valueRTL !== value) {
            this.valueRTL = value;
            this.subjectRTL.next(this.valueRTL);
        }
    };
    AppService.prototype.getRTL = function () {
        return this.valueRTL;
    };
    return AppService;
}());
AppService = __decorate([
    Injectable()
], AppService);
export { AppService };
//# sourceMappingURL=app.service.js.map