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
import { Http } from '@angular/http';
import { Subject } from 'rxjs';
import { ApiUrl } from '@ts-webapp/common';
import { LoaderService } from './loader.service';
// TODO: correct the url in the requests
var UserService = (function () {
    function UserService(http, loader) {
        this.http = http;
        this.loader = loader;
        this.activity = new Subject();
    }
    UserService.prototype.result = function (action, data) {
        this.loader.unload(action);
        this.activity.next(data);
    };
    UserService.prototype.login = function (username, password) {
        var _this = this;
        this.loader.load('login');
        this.http.post(ApiUrl() + '/user/login', { username: username, password: password }).subscribe(function (response) { return _this.result('login', response.json().ok && response.json()); });
        return this.activity;
    };
    UserService.prototype.logout = function () {
        var _this = this;
        this.loader.load('logout');
        this.http.post(ApiUrl() + '/user/logout', null).subscribe(function (response) { return _this.result('logout', response.json().ok && response.json()); });
        return this.activity;
    };
    UserService.prototype.register = function (username, password) {
        this.http.post(ApiUrl() + '/user/register', { username: username, password: password }).subscribe(function (response) { return console.log(response); });
        return this.activity;
    };
    UserService.prototype.check = function (post) {
        var _this = this;
        if (post === void 0) { post = false; }
        if (post) {
            this.loader.load('check');
            this.http.post(ApiUrl() + '/user/logged', null).subscribe(function (response) { return _this.result('check', response.json().ok && response.json()); });
        }
        return this.activity;
    };
    return UserService;
}());
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, LoaderService])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map