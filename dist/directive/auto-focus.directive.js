var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Renderer } from '@angular/core';
var AutoFocusDirective = (function () {
    function AutoFocusDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    AutoFocusDirective.prototype.ngOnInit = function () {
        this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);
    };
    return AutoFocusDirective;
}());
AutoFocusDirective = __decorate([
    Directive({
        selector: '[auto-focus]'
    }),
    __metadata("design:paramtypes", [ElementRef, Renderer])
], AutoFocusDirective);
export { AutoFocusDirective };
//# sourceMappingURL=auto-focus.directive.js.map