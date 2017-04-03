var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogService } from './dialog.service';
var NavigatorService = (function () {
    function NavigatorService(router, dialog, location) {
        this.router = router;
        this.dialog = dialog;
        this.location = location;
        this.url = [];
        // private safeUrl: any[] = [];
        this.messages = {};
        this.subscriptions = {};
        this.observable = new Subject();
        this.autoObservable = new Subject();
        this.titleObservable = new Subject();
        this.homeObservable = new Subject();
        this.menuObservable = new Subject();
        this.canGo = false;
        // window.onbeforeunload = (e) => {
        //   let messages = Object.keys(this.messages)
        //     .map(index => this.messages[index])
        //     .filter(message => message !== '')
        //     .join('\n');
        //   return messages.length ? messages : null;
        // };
    }
    NavigatorService.prototype.canDeactivate = function (component, route, state) {
        // console.log(component, route, state);
        // this.safeUrl = this.url;
        this.url = [];
        this.canGo = true;
        this.observable.next();
        if (this.canGo) {
            this.home(false);
            return true;
        }
        else {
            var me = this;
            return this.autoObservable;
        }
        // return this.permissions.canDeactivate(this.currentUser, route.params.id);
    };
    NavigatorService.prototype.subscription = function (id, message) {
        var _this = this;
        return function (value) {
            _this.canGo = false;
            _this.dialog.confirm(message).subscribe(function (ok) {
                if (ok) {
                    _this.cancel(id);
                    _this.resume();
                }
                else {
                    _this.reject();
                }
            });
        };
    };
    NavigatorService.prototype.stop = function () {
        this.canGo = false;
    };
    NavigatorService.prototype.reject = function () {
        // console.log(this.url, this.safeUrl);
        // this.url = this.safeUrl;
        this.autoObservable.next(false);
    };
    NavigatorService.prototype.cancel = function (id) {
        if (this.subscriptions[id] && this.subscriptions[id].unsubscribe) {
            this.subscriptions[id].unsubscribe();
        }
        delete (this.subscriptions[id]);
        delete (this.messages[id]);
    };
    NavigatorService.prototype.notify = function (id, message, subscription) {
        if (subscription === void 0) { subscription = false; }
        if (typeof message === 'function') {
            subscription = message;
            message = '';
        }
        else if (typeof subscription === 'boolean') {
            subscription = this.subscription(id, message);
        }
        this.messages[id] = message;
        this.subscriptions[id] = this.observable.subscribe(subscription);
        console.log(this.messages, this.subscriptions);
    };
    NavigatorService.prototype.resume = function () {
        this.goto.apply(this, this.url);
    };
    NavigatorService.prototype.back = function () {
        this.location.back();
    };
    NavigatorService.prototype.goto = function () {
        var url = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            url[_i] = arguments[_i];
        }
        // this.url = url;
        // this.canGo = true;
        // this.observable.next(url);
        // if (this.canGo) {
        if (url.length) {
            this.router.navigate(url);
        }
        else {
            this.home(false);
            this.autoObservable.next(true);
        }
        // }
    };
    NavigatorService.prototype.title = function (title) {
        if (!(title === null || title === undefined)) {
            this.titleObservable.next(title);
        }
        else {
            return this.titleObservable;
        }
    };
    NavigatorService.prototype.home = function (home) {
        if (!(home === null || home === undefined)) {
            this.homeObservable.next(home);
        }
        else {
            return this.homeObservable;
        }
    };
    NavigatorService.prototype.menu = function (menu) {
        if (!(menu === null || menu === undefined)) {
            this.menuObservable.next(menu);
        }
        else {
            return this.menuObservable;
        }
    };
    return NavigatorService;
}());
NavigatorService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Router, DialogService, Location])
], NavigatorService);
export { NavigatorService };
export var canDeactivate = [NavigatorService];
//# sourceMappingURL=navigator.service.js.map