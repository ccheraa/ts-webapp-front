import { Component, OnInit, Inject, HostListener, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { join } from 'path';

import { MenuItemClass } from '@ts-webapp/common';
import { MenuService, LoaderService, UserService, DialogService, NavigatorService } from '../../service';

@Component({
  selector: 'app-root',
  templateUrl: join(__dirname, 'app.component.html'),
  styles: []
})
export class AppComponent implements OnInit {
  dark = false;
  rtl = false;
  isHome = false;
  leftPane = false;
  rightPane = false;
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
  constructor(@Inject(DOCUMENT) private document: any, private menuService: MenuService, private userService: UserService, private dialogService: DialogService, private loaderService: LoaderService, private navigator: NavigatorService) {}
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
    this.setDark();
    this.setRtl();
    // this.msgService.confirm('Yo!');
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
