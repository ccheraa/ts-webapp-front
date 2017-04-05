import { Component, OnInit, Inject, HostListener, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { join } from 'path';

import { MenuItemClass } from '@ts-webapp/common';
import { MenuService, LoaderService, UserService, DialogService, NavigatorService, AppService } from '../../service';

@Component({
  selector: 'app-root',
  template: `<div class="app">
  <div class="sidebar main" always [class.wide]="mainPane">
    <div class="sidebar-overlay" (click)="mainPane=false"></div>
    <span class="title">TS-APP</span>
    <button md-icon-button menu (click)="mainPane = !mainPane" [mdTooltip]="mainPane ? 'collapse' : 'expand'" mdTooltipPosition="after">
      <md-icon>menu</md-icon>
      <md-icon wide>chevron_{{rtl ? 'right' : 'left'}}</md-icon>
    </button>

    <button md-icon-button *ngFor="let item of menu" (click)="goto(item.id)" [mdTooltip]="item.text" mdTooltipPosition="after"><md-icon>{{item.icon}}</md-icon></button>
    <button md-button *ngFor="let item of menu" (click)="goto(item.id)">
      <md-icon>{{item.icon}}</md-icon>
      <span> {{item.text}}</span>
    </button>

    <div class="fill"></div>

    <button md-icon-button mdTooltip="Settings" mdTooltipPosition="after"><md-icon>settings</md-icon></button>
    <button md-button>
      <md-icon>settings</md-icon>
      <span> Settings</span>
    </button>
    
    <button md-icon-button mdTooltip="About" mdTooltipPosition="after"><md-icon>info</md-icon></button>
    <button md-button>
      <md-icon>info</md-icon>
      <span> About</span>
    </button>

  </div>
  <div class="body">
    <md-toolbar [class.shaded]="shaded">
      <button md-icon-button back mdTooltip="Home" [disabled]="isHome ? true : null" (click)="back()"><md-icon *ngIf="!isHome">arrow_{{rtl ? 'forward' : 'back'}}</md-icon></button>
      <span> {{title}}</span>
      <span fl></span>
      <button md-icon-button avatar mdTooltip="About" (click)="toggleSidePane()">
        <img *ngIf="user" [src]="'/res/img/user/' + user.username + '.jpg'" alt="">
        <md-icon *ngIf="!user">account_circle</md-icon>
      </button>
      <button md-icon-button mdTooltip="More..." *ngIf="vertMenu.length > 0" [mdMenuTriggerFor]="moreMenu"><md-icon>more_vert</md-icon></button>
      <md-menu #moreMenu="mdMenu">
        <button md-menu-item *ngFor="let item of vertMenu" (click)="item.action && item.action()">
          <md-icon *ngIf="!!item.icon">{{item.icon}}</md-icon>
          <span> {{item.text}}</span>
        </button>
      </md-menu>
      <md-progress-bar color="primary" [hidden]="!loading" mode="query"></md-progress-bar>
    </md-toolbar>
    <div #body class="body-content">
      <router-outlet></router-outlet><br>
    </div>
  </div>
  <div class="sidebar side" [class.wide]="sidePane">
    <div class="sidebar-overlay" (click)="sidePane=false"></div>
    <app-side></app-side>
  </div>
</div>
`,
  styles: []
})
export class AppComponent implements OnInit {
  dark = false;
  rtl = false;
  isHome = false;
  mainPane = false;
  sidePane = false;
  user = false;
  shaded = false;
  loading = false;
  vertMenu: any[] = [];
  title = 'TS-APP';
  settings = <MenuItemClass[]>[
    { text: 'Clients', icon: 'group', id: 'contacts' },
    { text: 'New client', icon: 'group_add', id: 'contact'},
    { text: '-'},
    { text: 'Courses', icon: 'note', id: 'courses' },
    { text: 'New course', icon: 'note_add', id: 'course'},
    { text: '-'},
    // { text: 'Bills', icon: 'assignment', id: 'bills' },
    // { text: 'New bill', icon: 'add', id: 'bill'},
    // { text: '-'},
    { text: 'Scans', icon: 'scanner', id: 'scans' },
  ];
  menu: MenuItemClass[] = [];
  constructor(@Inject(DOCUMENT) private document: any, private menuService: MenuService, private userService: UserService, private dialogService: DialogService, private loaderService: LoaderService, private navigator: NavigatorService, private app: AppService) {}
  @ViewChild('body') body: any;
  ngOnInit() {
    this.loaderService.check().subscribe(loading => this.loading = loading);
    this.navigator.title().subscribe(title => this.title = title);
    this.navigator.home().subscribe(home => this.isHome = home);
    this.navigator.menu().subscribe(menu => console.log(this.vertMenu = menu));
    this.body.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
    this.menuService.getItems().subscribe(items => {
      this.menu = items;
    });
    this.userService.check(true).subscribe(response => this.user = response.user);
    this.app.checkMainPane().subscribe(mainPane => this.mainPane = mainPane);
    this.app.checkSidePane().subscribe(sidePane => this.sidePane = sidePane);
    this.app.checkDark().subscribe(dark => {
      this.dark = dark;
      this.setDark();
    });
    this.setDark();
    this.app.checkRTL().subscribe(rtl => {
      this.rtl = rtl;
      this.setRtl();
    });
    this.app.setMainPane(this.mainPane);
    this.app.setSidePane(this.sidePane);
    this.app.setDark(this.dark);
    this.app.setRTL(this.rtl);
    // this.msgService.confirm('Yo!');
  }
  toggleMainPane() {
    this.app.toggleMainPane();
  }
  toggleSidePane() {
    this.app.toggleSidePane();
  }
  toggleDark() {
    this.app.toggleDark();
  }
  toggleRTL() {
    this.app.toggleRTL();
  }
  onScroll() {
    // console.log(this);
    if (this.body.nativeElement.scrollTop > 14 !== this.shaded) {
      this.shaded = !this.shaded;
    }
  }
  setDark() {
    if (this.dark) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
  }
  setRtl() {
    document.body.style.direction = this.rtl ? 'rtl' : 'ltr';
    if (this.rtl) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }
  goto(url) {
    this.navigator.goto(url);
  }
  back() {
    this.navigator.back();
  }
  logout() {
    // this.msgService.confirm('Log out', 'Are you sure you want to log out?').subscribe(ok => ok && this.logService.logout());
  }
  test() {
    this.dialogService.confirm('Yo!', 'Yoooooooooooooooooo', ['Grant', 'Deny']);
  }
}
