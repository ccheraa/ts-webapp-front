"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
function findIndex(array, callback) {
    if (array === null) {
        throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    else if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    var list = Object(array);
    var length = list.length >>> 0;
    var arrayArg = arguments[1];
    for (var i = 0; i < length; i++) {
        if (callback.call(arrayArg, list[i], i, list)) {
            return i;
        }
    }
    return -1;
}
var LoaderService = (function () {
    function LoaderService() {
        this.loading = [];
        this.result = new rxjs_1.Subject();
    }
    LoaderService.prototype.load = function (action, cb) {
        console.log('loading: ' + action + '...');
        if (findIndex(this.loading, function (loading) { return loading.action === action; }) < 0) {
            this.loading.push({
                action: action,
                cb: cb
            });
        }
        return this.check();
    };
    LoaderService.prototype.unload = function (action) {
        console.log('unloading: ' + action + '...');
        var found = findIndex(this.loading, function (loading) { return loading.action === action; });
        if (found > -1) {
            if (this.loading[found].cb) {
                this.loading[found].cb();
            }
            this.loading.splice(found, 1);
        }
        return this.check();
    };
    LoaderService.prototype.check = function () {
        this.result.next(this.loading.length > 0);
        return this.result;
    };
    return LoaderService;
}());
LoaderService = __decorate([
    core_1.Injectable()
], LoaderService);
exports.LoaderService = LoaderService;
//# sourceMappingURL=loader.service.js.map