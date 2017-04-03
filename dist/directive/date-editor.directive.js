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
var DateEditorDirective = (function () {
    function DateEditorDirective(el) {
        this.el = el;
        this.dateChange = new EventEmitter(true);
    }
    DateEditorDirective.prototype.ngOnInit = function () {
        if (typeof this.date === 'undefined') {
            this.date = new Date();
            this.dateChange.emit(this.date);
        }
        if (!(this.date instanceof Date)) {
            this.date = new Date(this.date);
            this.dateChange.emit(this.date);
        }
        this.el.nativeElement.value = this.date.toISOString().substring(0, 10);
    };
    DateEditorDirective.prototype.onChange = function (event) {
        var value = this.el.nativeElement.value.split('-');
        this.date.setFullYear(value[0], value[1] - 1, value[2]);
        this.dateChange.emit(this.date);
    };
    return DateEditorDirective;
}());
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DateEditorDirective.prototype, "dateChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], DateEditorDirective.prototype, "date", void 0);
__decorate([
    HostListener('change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DateEditorDirective.prototype, "onChange", null);
DateEditorDirective = __decorate([
    Directive({
        selector: '[date-value]'
    }),
    __metadata("design:paramtypes", [ElementRef])
], DateEditorDirective);
export { DateEditorDirective };
//# sourceMappingURL=date-editor.directive.js.map