var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Output, Input, EventEmitter, HostListener } from '@angular/core';
var TimeEditorDirective = (function () {
    function TimeEditorDirective(el) {
        this.el = el;
        this.timeChange = new EventEmitter(true);
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
    Output(),
    __metadata("design:type", EventEmitter)
], TimeEditorDirective.prototype, "timeChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], TimeEditorDirective.prototype, "time", void 0);
__decorate([
    HostListener('change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TimeEditorDirective.prototype, "onChange", null);
TimeEditorDirective = __decorate([
    Directive({
        selector: '[time-value]'
    }),
    __metadata("design:paramtypes", [ElementRef])
], TimeEditorDirective);
export { TimeEditorDirective };
//# sourceMappingURL=time-editor.directive.js.map