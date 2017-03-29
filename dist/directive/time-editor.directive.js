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
var TimeEditorDirective = (function () {
    function TimeEditorDirective(el) {
        this.el = el;
        this.timeChange = new core_1.EventEmitter(true);
    }
    TimeEditorDirective.prototype.ngOnInit = function () {
        if (typeof this.time === 'undefined') {
            this.time = new Date();
            this.timeChange.emit(this.time);
        }
        if (!(this.time instanceof Date)) {
            this.time = new Date(this.time);
            this.timeChange.emit(this.time);
        }
        this.el.nativeElement.value = this.time.getHours() + ':' + this.time.getMinutes();
    };
    TimeEditorDirective.prototype.onChange = function (event) {
        var value = this.el.nativeElement.value.split(':');
        this.time.setHours(value[0]);
        this.time.setMinutes(value[1]);
        this.timeChange.emit(this.time);
    };
    return TimeEditorDirective;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TimeEditorDirective.prototype, "timeChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], TimeEditorDirective.prototype, "time", void 0);
__decorate([
    core_1.HostListener('change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TimeEditorDirective.prototype, "onChange", null);
TimeEditorDirective = __decorate([
    core_1.Directive({
        selector: '[time-value]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], TimeEditorDirective);
exports.TimeEditorDirective = TimeEditorDirective;
//# sourceMappingURL=time-editor.directive.js.map