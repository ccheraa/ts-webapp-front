"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var service_1 = require("../../service");
var class_1 = require("../../class");
var table_editor_component_1 = require("../table-editor/table-editor.component");
var rxjs_1 = require("rxjs");
var table_component_html_1 = require("./table.component.html");
var db_1 = require("../../db");
var TableComponent = (function () {
    function TableComponent(nav, dialog) {
        this.nav = nav;
        this.dialog = dialog;
        this.selectionChange = new core_1.EventEmitter();
        this.data = [];
        this.defaultEdit = table_editor_component_1.TableEditorComponent;
        this.pagesOption = [10, 20, 50, 100];
        this.limit = 20;
        this.pager = {
            limit: this.limit,
            pages: 0,
            current: 0,
            count: 0,
            pagesCount: 0,
            goto: function (page) {
                this.firstElement = this.current * this.limit + 1;
                this.lastElement = (this.current + 1) * this.limit;
                if (this.firstElement > this.count) {
                    this.firstElement = this.count;
                }
                if (this.lastElement > this.count) {
                    this.lastElement = this.count;
                }
                if ((page >= 0) && (page < this.pagesCount)) {
                    this.current = page;
                    return true;
                }
                return false;
            },
            setCount: function (count) {
                this.count = count;
                this.pagesCount = Math.ceil(count / this.limit);
                if (this.current > this.pagesCount - 1) {
                    this.current = this.pagesCount - 1;
                    if (this.current < 0) {
                        this.current = 0;
                    }
                }
                this.goto(this.current);
            },
            setLimit: function (limit) {
                if (limit !== this.limit) {
                    this.limit = limit;
                    this.setCount(this.count);
                    return true;
                }
                return false;
            },
            next: function () {
                return this.goto(this.current + 1);
            },
            prev: function () {
                return this.goto(this.current - 1);
            }
        };
        this.items = [];
        this.sortInverse = true;
        this.allSelected = false;
        this.selectedCount = 0;
        this.selected = null;
        this.shaded = false;
        this.scrollValue = 0;
        this.showSearch = false;
    }
    Object.defineProperty(TableComponent.prototype, "selection", {
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    TableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tableBody.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
        this.keypress = new rxjs_1.Subject();
        this.keypress.debounceTime(1000)
            .subscribe(function (res) {
            _this.refresh();
        });
        this.config.columns.forEach(function (column) {
            if (column.read) {
                column.auto = true;
            }
            else {
                column.auto = false;
                column.read = function (item) { return item[column.name]; };
            }
        });
        if (!this.config.main) {
            var mains = this.config.columns.filter(function (column) { return column.main; });
            this.config.main = mains.length ? mains[0] : this.config.columns[0];
        }
        this.refresh();
    };
    TableComponent.prototype.onScroll = function () {
        if (this.tableBody.nativeElement.scrollTop === this.scrollValue) {
            return;
        }
        this.scrollValue = this.tableBody.nativeElement.scrollTop;
        // console.log(this.scrollValue);
        if (this.tableBody.nativeElement.scrollTop > 14 !== this.shaded) {
            this.shaded = !this.shaded;
        }
    };
    TableComponent.prototype.refresh = function (res) {
        var _this = this;
        // res && console.log(res.action);
        // let config: any = {
        //   limit: this.pager.limit,
        //   skip: this.pager.current * this.pager.limit
        // };
        // if (this.sortField) {
        //   config.sort = (this.sortInverse ? '-' : '') + (this.sortField.sort === true ? this.sortField.name : this.sortField.sort);
        // }
        var skip = this.pager.current * this.pager.limit;
        var limit = skip + this.pager.limit;
        var data = this.data;
        // console.log('refreshing...', this.items.length);
        if (this.searchValue) {
            // console.log('filtering...', this.items.length);
            data = data.filter(function (item) { return item[_this.config.main.name].indexOf(_this.searchValue) > -1; });
        }
        this.items = data.slice(skip, limit) || [];
        // this.items.forEach(item => item.new_price = item.price);
        // this.edit(); ///
        // this.edit(this.items[0]); ///
        this.selectedCount = this.items.filter(function (item) { return item.selected; }).length;
        this.allSelected = !!this.items.length && this.selectedCount === this.items.length;
        this.pager.setCount(data.length);
    };
    TableComponent.prototype.next = function () {
        if (this.pager.next()) {
            this.refresh();
        }
    };
    TableComponent.prototype.prev = function () {
        if (this.pager.prev()) {
            this.refresh();
        }
    };
    TableComponent.prototype.limitChange = function () {
        if (this.pager.setLimit(this.limit)) {
            this.refresh();
        }
    };
    TableComponent.prototype.select = function (item) {
        var _this = this;
        this.selected = item;
        if (item) {
            item.selected ? this.selectedCount++ : this.selectedCount--;
            this.allSelected = this.selectedCount === this.items.length;
        }
        else {
            this.items.forEach(function (thisitem) { return thisitem.selected = _this.allSelected; });
            this.selectedCount = this.allSelected ? this.items.length : 0;
        }
        this.selectionChange.emit(this.selectedCount);
    };
    // change(item, field) {
    //   let newField = 'new_' + field;
    //   if (item[field] === item[newField]) {
    //     return;
    //   }
    //   let data = {};
    //   data[field] = item[newField];
    //   this.db.set(this.config.table, item._id, data).subscribe(res => res.ok && (item[field] = item[newField]));
    // }
    TableComponent.prototype.sort = function (field) {
        var _this = this;
        if (this.sortField && this.sortField.name === field.name) {
            this.sortInverse = !this.sortInverse;
        }
        else {
            this.sortField = field;
            this.sortInverse = true;
        }
        this.data.sort(function (a, b) { return (_this.sortField.read(a) === _this.sortField.read(b)) ? 0 : ((((_this.sortField.read(a) < _this.sortField.read(b)) && _this.sortInverse) || ((_this.sortField.read(a) > _this.sortField.read(b)) && !_this.sortInverse)) ? 1 : -1); });
        this.refresh();
    };
    TableComponent.prototype.doDelete = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            for (var i = _this.data.length - 1; i >= 0; i--) {
                if (item ? _this.data[i]._id === item._id : _this.data[i].selected) {
                    _this.data.splice(i, 1);
                }
            }
            resolve();
        });
    };
    TableComponent.prototype.delete = function (item) {
        var _this = this;
        if (!item && this.selectedCount === 1) {
            this.items.some(function (listItem) { return listItem.selected && (item = listItem); });
        }
        var message = item ? this.config.main.read(item) : this.selectedCount + ' item' + (this.selectedCount > 1 ? 's' : '');
        this.dialog.modal().confirm('Are you sure you want to delete ' + message + '?').subscribe(function (ok) {
            if (ok) {
                _this.doDelete(item).then(function () {
                    _this.refresh();
                });
            }
        });
    };
    TableComponent.prototype.doEdit = function (isNew, res, row) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (isNew) {
                _this.config.createID(res).then(function (res) {
                    _this.data.push(res);
                    resolve();
                });
            }
            else {
                row.assign(res);
                resolve();
            }
        });
    };
    TableComponent.prototype.edit = function (row) {
        var _this = this;
        var isNew = !(row && row._id);
        this.dialog.use(this.config.edit || this.defaultEdit, { columns: this.config.columns, row: row }, true).subscribe(function (res) {
            _this.doEdit(isNew, res, row).then(function () {
                _this.refresh();
            });
        });
    };
    TableComponent.prototype.click = function (row, column) {
        // console.log('clicked', column);
        if (column.editOnClick) {
            this.edit(row);
        }
        if (column.click) {
            column.click(row, column);
        }
    };
    return TableComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TableComponent.prototype, "selectionChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], TableComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], TableComponent.prototype, "selection", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TableComponent.prototype, "config", void 0);
__decorate([
    core_1.ViewChild('tableBody'),
    __metadata("design:type", Object)
], TableComponent.prototype, "tableBody", void 0);
TableComponent = __decorate([
    core_1.Component({
        template: table_component_html_1.template,
        selector: 'md-table',
        animations: [class_1.animFade('fade'), class_1.animFadeProperty('search', 'true', 'false')],
    }),
    __metadata("design:paramtypes", [service_1.NavigatorService, service_1.DialogService])
], TableComponent);
exports.TableComponent = TableComponent;
var DataTableComponent = (function (_super) {
    __extends(DataTableComponent, _super);
    function DataTableComponent(nav, dialog) {
        return _super.call(this, nav, dialog) || this;
    }
    DataTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.model.check().subscribe(function () { return _this.refresh(); });
    };
    DataTableComponent.prototype.refresh = function (res) {
        var _this = this;
        var config = {
            limit: this.pager.limit,
            skip: this.pager.current * this.pager.limit
        };
        var conditions = {};
        if (this.sortField) {
            config.sort = (this.sortInverse ? '-' : '') + (this.sortField.sort === true ? this.sortField.name : this.sortField.sort);
        }
        if (this.searchValue) {
            conditions[this.config.main.name] = { $regex: this.searchValue, $options: 'i' };
        }
        this.model.find(conditions, null, config).subscribe(function (res) {
            _this.items = res.rows;
            ;
            // this.edit(); ///
            // this.edit(this.items[0]); ///
            _this.selectedCount = _this.items.filter(function (item) { return item.selected; }).length;
            _this.allSelected = !!_this.items.length && _this.selectedCount === _this.items.length;
            _this.pager.setCount(res.total);
        });
    };
    DataTableComponent.prototype.doDelete = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (item && item._id) {
                _this.model.remove(item._id).subscribe(function () { return resolve(); });
            }
            else {
                var i_1 = _this.items.length;
                var deleteNext_1 = function () { };
                while (i_1 > 0) {
                    i_1--;
                    if (_this.items[i_1].selected) {
                        _this.model.remove(_this.items[i_1]._id).subscribe(function () { return i_1 > 0 ? deleteNext_1() : resolve(); });
                    }
                }
            }
        });
    };
    DataTableComponent.prototype.doEdit = function (isNew, res, row) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (isNew) {
                _this.model.create(res).subscribe(function () { return resolve(); });
            }
            else {
                _this.model.set(row._id, res).subscribe(function () { return resolve(); });
            }
        });
    };
    return DataTableComponent;
}(TableComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", db_1.ModelClient)
], DataTableComponent.prototype, "model", void 0);
DataTableComponent = __decorate([
    core_1.Component({
        template: table_component_html_1.template,
        selector: 'md-data-table',
        animations: [class_1.animFade('fade'), class_1.animFadeProperty('search', 'true', 'false')],
    }),
    __metadata("design:paramtypes", [service_1.NavigatorService, service_1.DialogService])
], DataTableComponent);
exports.DataTableComponent = DataTableComponent;
//# sourceMappingURL=table.component.js.map