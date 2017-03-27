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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var service_1 = require("../../service");
var AppComponent = (function () {
    function AppComponent(document, menuService, userService, dialogService, loaderService, navigator) {
        this.document = document;
        this.menuService = menuService;
        this.userService = userService;
        this.dialogService = dialogService;
        this.loaderService = loaderService;
        this.navigator = navigator;
        this.dark = false;
        this.rtl = false;
        this.isHome = false;
        this.leftPane = false;
        this.rightPane = false;
        this.user = false;
        this.shaded = false;
        this.loading = false;
        this.vertMenu = [];
        this.title = 'TS-APP';
        this.settings = [
            { text: 'Clients', icon: 'group', id: 'contacts' },
            { text: 'New client', icon: 'group_add', id: 'contact' },
            { text: '-' },
            { text: 'Courses', icon: 'note', id: 'courses' },
            { text: 'New course', icon: 'note_add', id: 'course' },
            { text: '-' },
            // { text: 'Bills', icon: 'assignment', id: 'bills' },
            // { text: 'New bill', icon: 'add', id: 'bill'},
            // { text: '-'},
            { text: 'Scans', icon: 'scanner', id: 'scans' },
        ];
        this.menu = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loaderService.check().subscribe(function (loading) { return _this.loading = loading; });
        this.navigator.title().subscribe(function (title) { return _this.title = title; });
        this.navigator.home().subscribe(function (home) { return _this.isHome = home; });
        this.navigator.menu().subscribe(function (menu) { return console.log(_this.vertMenu = menu); });
        this.body.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
        this.menuService.getItems().subscribe(function (items) {
            _this.menu = items;
        });
        this.userService.check(true).subscribe(function (response) { return _this.user = response.user; });
        this.setDark();
        this.setRtl();
        // this.msgService.confirm('Yo!');
    };
    AppComponent.prototype.onScroll = function () {
        // console.log(this);
        if (this.body.nativeElement.scrollTop > 14 !== this.shaded) {
            this.shaded = !this.shaded;
        }
    };
    AppComponent.prototype.setDark = function () {
        if (this.dark) {
            document.body.classList.add('theme-dark');
        }
        else {
            document.body.classList.remove('theme-dark');
        }
    };
    AppComponent.prototype.setRtl = function () {
        document.body.style.direction = this.rtl ? 'rtl' : 'ltr';
        if (this.rtl) {
            document.body.classList.add('rtl');
        }
        else {
            document.body.classList.remove('rtl');
        }
    };
    AppComponent.prototype.goto = function (url) {
        this.navigator.goto(url);
    };
    AppComponent.prototype.back = function () {
        this.navigator.back();
    };
    AppComponent.prototype.logout = function () {
        // this.msgService.confirm('Log out', 'Are you sure you want to log out?').subscribe(ok => ok && this.logService.logout());
    };
    AppComponent.prototype.test = function () {
        this.dialogService.confirm('Yo!', 'Yoooooooooooooooooo', ['Grant', 'Deny']);
    };
    return AppComponent;
}());
__decorate([
    core_1.ViewChild('body'),
    __metadata("design:type", Object)
], AppComponent.prototype, "body", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        template: "\n<div class=\"app\">\n  <div class=\"sidebar main\" always [class.wide]=\"mainPane\">\n    <div class=\"sidebar-overlay\" (click)=\"mainPane=false\"></div>\n    <span class=\"title\">TS-APP</span>\n    <button md-icon-button menu (click)=\"mainPane = !mainPane\" [mdTooltip]=\"mainPane ? 'collapse' : 'expand'\" mdTooltipPosition=\"after\">\n      <md-icon>menu</md-icon>\n      <md-icon wide>chevron_{{rtl ? 'right' : 'left'}}</md-icon>\n    </button>\n\n    <button md-icon-button *ngFor=\"let item of menu\" (click)=\"goto(item.id)\" [mdTooltip]=\"item.text\" mdTooltipPosition=\"after\"><md-icon>{{item.icon}}</md-icon></button>\n    <button md-button *ngFor=\"let item of menu\" (click)=\"goto(item.id)\">\n      <md-icon>{{item.icon}}</md-icon>\n      <span> {{item.text}}</span>\n    </button>\n\n    <div class=\"fill\"></div>\n\n    <button md-icon-button mdTooltip=\"Settings\" mdTooltipPosition=\"after\"><md-icon>settings</md-icon></button>\n    <button md-button>\n      <md-icon>settings</md-icon>\n      <span> Settings</span>\n    </button>\n    \n    <button md-icon-button mdTooltip=\"About\" mdTooltipPosition=\"after\"><md-icon>info</md-icon></button>\n    <button md-button>\n      <md-icon>info</md-icon>\n      <span> About</span>\n    </button>\n\n  </div>\n  <div class=\"body\">\n    <md-toolbar [class.shaded]=\"shaded\">\n      <button md-icon-button back mdTooltip=\"Home\" [disabled]=\"isHome ? true : null\" (click)=\"back()\"><md-icon *ngIf=\"!isHome\">arrow_{{rtl ? 'forward' : 'back'}}</md-icon></button>\n      <span> {{title}}</span>\n      <span fl></span>\n      <button md-icon-button (click)=\"test()\">\n        <md-icon>code</md-icon>\n      </button>\n      <button md-icon-button (click)=\"mainPane=!mainPane\">\n        <md-icon>menu</md-icon>\n      </button>\n      <button md-icon-button (click)=\"sidePane=!sidePane\">\n        <md-icon>chrome_reader_mode</md-icon>\n      </button>\n      <button md-icon-button (click)=\"dark=!dark;setDark()\">\n        <md-icon>color_lens</md-icon>\n      </button>\n      <button md-icon-button (click)=\"rtl=!rtl;setRtl()\">\n        <md-icon>swap_horiz</md-icon>\n      </button>\n      <span fl></span>\n      <button md-icon-button avatar mdTooltip=\"About\" (click)=\"sidePane=!sidePane\">\n        <img *ngIf=\"user\" [src]=\"'/res/img/user/' + user.username + '.jpg'\" alt=\"\">\n        <md-icon *ngIf=\"!user\">account_circle</md-icon>\n      </button>\n      <button md-icon-button mdTooltip=\"More...\" *ngIf=\"vertMenu.length > 0\" [mdMenuTriggerFor]=\"moreMenu\"><md-icon>more_vert</md-icon></button>\n      <md-menu #moreMenu=\"mdMenu\">\n        <button md-menu-item *ngFor=\"let item of vertMenu\" (click)=\"item.action && item.action()\">\n          <md-icon *ngIf=\"!!item.icon\">{{item.icon}}</md-icon>\n          <span> {{item.text}}</span>\n        </button>\n      </md-menu>\n      <md-progress-bar color=\"primary\" [hidden]=\"!loading\" mode=\"query\"></md-progress-bar>\n    </md-toolbar>\n    <div #body class=\"body-content\">\n      <router-outlet></router-outlet><br>\n    </div>\n  </div>\n  <div class=\"sidebar side\" [class.wide]=\"sidePane\">\n    <div class=\"sidebar-overlay\" (click)=\"sidePane=false\"></div>\n    <app-side></app-side>\n  </div>\n</div>\n",
        styles: []
    }),
    __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [Object, service_1.MenuService, service_1.UserService, service_1.DialogService, service_1.LoaderService, service_1.NavigatorService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map