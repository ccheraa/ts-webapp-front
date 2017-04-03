import { Subject } from 'rxjs';
import { DBUrl } from '@ts-webapp/common';
var ModelClient = (function () {
    function ModelClient() {
        this.url = '/';
        this.checking = new Subject();
    }
    ModelClient.prototype.useLoader = function (loader, loaderName) {
        this.loader = loader;
        this.loaderName = loaderName;
    };
    ModelClient.prototype.load = function (id) {
        if (this.loader) {
            this.loader.load(id);
        }
    };
    ModelClient.prototype.unload = function (id) {
        if (this.loader) {
            this.loader.unload(id);
        }
    };
    ModelClient.prototype.check = function () {
        return this.checking;
    };
    ModelClient.prototype.decodeResponse = function (subject, response, refresh) {
        if (refresh === void 0) { refresh = false; }
        if (response.json) {
            var json = response.json();
            if (json.ok) {
                subject.next(json.data);
                if (refresh) {
                    this.checking.next();
                }
            }
            else {
                subject.error(json.errors);
            }
        }
        else {
            subject.error(['NO JSON']);
        }
        subject.complete();
    };
    ModelClient.prototype.create = function (document) {
        var _this = this;
        this.load('create:' + this.loaderName);
        var result = new Subject();
        this.http.post(DBUrl() + this.url, { document: document }).subscribe(function (response) {
            _this.unload('create:' + _this.loaderName);
            _this.decodeResponse(result, response, true);
        }, function (err) {
            _this.unload('create:' + _this.loaderName);
            result.error(err);
        });
        return result;
    };
    // // R
    ModelClient.prototype.list = function (conditions, projection, options) {
        var _this = this;
        this.load('list:' + this.loaderName);
        var result = new Subject();
        this.http.post(DBUrl() + this.url, { conditions: conditions, projection: projection, options: options }).subscribe(function (response) {
            _this.unload('list:' + _this.loaderName);
            _this.decodeResponse(result, response);
        }, function (err) {
            _this.unload('list:' + _this.loaderName);
            result.error(err);
        });
        return result;
    };
    ModelClient.prototype.find = function (conditions, projection, options) {
        var _this = this;
        this.load('find:' + this.loaderName);
        var result = new Subject();
        this.http.post(DBUrl() + this.url + '/find', { conditions: conditions, projection: projection, options: options }).subscribe(function (response) {
            _this.unload('find:' + _this.loaderName);
            _this.decodeResponse(result, response);
        }, function (err) {
            _this.unload('find:' + _this.loaderName);
            result.error(err);
        });
        return result;
    };
    ModelClient.prototype.count = function (conditions) {
        var _this = this;
        // TODO: conditions not used
        this.load('count:' + this.loaderName);
        var result = new Subject();
        this.http.get(DBUrl() + this.url + '/count').subscribe(function (response) {
            _this.unload('count:' + _this.loaderName);
            _this.decodeResponse(result, response);
        }, function (err) {
            _this.unload('count:' + _this.loaderName);
            result.error(err);
        });
        return result;
    };
    ModelClient.prototype.get = function (id, projection, options) {
        var _this = this;
        // TODO: projection and options not used
        this.load('get:' + this.loaderName);
        var result = new Subject();
        this.http.get(DBUrl() + this.url + '/' + id).subscribe(function (response) {
            _this.unload('get:' + _this.loaderName);
            _this.decodeResponse(result, response);
        }, function (err) {
            _this.unload('get:' + _this.loaderName);
            result.error(err);
        });
        return result;
    };
    // // U
    ModelClient.prototype.set = function (id, document, options) {
        var _this = this;
        // TODO: options not used
        this.load('set:' + this.loaderName);
        var result = new Subject();
        this.http.post(DBUrl() + this.url + '/' + id, { document: document }).subscribe(function (response) {
            _this.unload('set:' + _this.loaderName);
            _this.decodeResponse(result, response, true);
        }, function (err) {
            _this.unload('set:' + _this.loaderName);
            result.error(err);
        });
        return result;
    };
    ModelClient.prototype.update = function (conditions, document, options) {
        var _this = this;
        // TODO: options not used
        this.load('update:' + this.loaderName);
        var result = new Subject();
        this.http.put(DBUrl() + this.url, { conditions: conditions, document: document }).subscribe(function (response) {
            _this.unload('update:' + _this.loaderName);
            _this.decodeResponse(result, response, true);
        }, function (err) {
            _this.unload('update:' + _this.loaderName);
            result.error(err);
        });
        return result;
    };
    ModelClient.prototype.remove = function (conditions) {
        var _this = this;
        this.load('remove:' + this.loaderName);
        var result = new Subject();
        var isString = typeof conditions === 'string';
        this.http.delete(DBUrl() + this.url + (isString ? '/' + conditions : ''), isString ? null : { body: { conditions: conditions } }).subscribe(function (response) {
            _this.unload('remove:' + _this.loaderName);
            _this.decodeResponse(result, response, true);
        }, function (err) {
            _this.unload('remove:' + _this.loaderName);
            result.error(err);
        });
        return result;
    };
    return ModelClient;
}());
export { ModelClient };
//# sourceMappingURL=model-client.js.map