import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ComponentType } from '@angular/material';
import { NavigatorService, DialogService } from '../../service';
import { animFade, animFadeProperty } from '../../class';
import { TableEditorComponent } from '../table-editor/table-editor.component';
import { Subject } from 'rxjs';
import { template } from './table.component.html';
import { ModelClient } from '../../db';

export type Column = {
  isid?: boolean,
  name?: string,
  text?: string,
  type?: string,
  main?: boolean,
  check?: boolean,
  sort?: boolean,
  center?: boolean,
  centerData?: boolean,
  placeholder?: string,
  read?: (item: any) => any;
  auto?: boolean,
  editOnClick?: boolean;

  yesno?: [ string, string ],
  icons?: [ string, string ],
};

export type Data = {
  row: any,
  columns: Column[]
};

@Component({
  template,
  selector: 'md-table',
  animations: [ animFade('fade'), animFadeProperty('search', 'true', 'false') ],
  // styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() selectionChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() data: any[] = [];
  @Input() set selection(value) {}
  @Input() public config: {
    table: string,
    checkbox?: boolean,
    createID?: (item: any) => Promise<any>,
    edit?: ComponentType<any>,
    main?: Column;
    columns: Column[]
  };
  defaultEdit = TableEditorComponent;
  pagesOption = [10, 20, 50, 100];
  limit = 20;
  pager = {
    limit: this.limit,
    pages: 0,
    current: 0,
    count: 0,
    pagesCount: 0,
    goto: function(page: number): boolean {
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
    setCount: function(count: number) {
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
    setLimit: function(limit: number) {
      if (limit !== this.limit) {
        this.limit = limit;
        this.setCount(this.count);
        return true;
      }
      return false;
    },
    next: function(): boolean {
      return this.goto(this.current + 1);
    },
    prev: function(): boolean {
      return this.goto(this.current - 1);
    }
  };

  items: any[] = [];
  sortField: any;
  sortInverse = true;
  allSelected = false;
  selectedCount = 0;
  selected: any = null;

  shaded = false;
  scrollValue = 0;

  showSearch = false;
  searchValue: any;

  keypress: Subject<any>;

  @ViewChild('tableBody') tableBody: any;
  constructor(private nav: NavigatorService, private dialog: DialogService) { }
  ngOnInit() {
    this.tableBody.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
    this.keypress = new Subject<any>();
    this.keypress.debounceTime(1000)
      // .map(val => console.info(val) && val)
      // .map(buffer => buffer.length)
      // .filter(count => count > 0)
      .subscribe(res => {
        this.refresh();
      });
    this.config.columns.forEach(column => {
      if (column.read) {
        column.auto = true;
      } else {
        column.auto = false;
        column.read = (item) => item[column.name];
      }
    });
    if (!this.config.main) {
      let mains = this.config.columns.filter(column => column.main);
      this.config.main = mains.length ? mains[0] : this.config.columns[0];
    }
    this.refresh();
  }
  onScroll() {
    if (this.tableBody.nativeElement.scrollTop === this.scrollValue) {
      return;
    }
    this.scrollValue = this.tableBody.nativeElement.scrollTop;
    // console.log(this.scrollValue);
    if (this.tableBody.nativeElement.scrollTop > 14 !== this.shaded) {
      this.shaded = !this.shaded;
    }
  }

  refresh(res?) {
    // res && console.log(res.action);
    // let config: any = {
    //   limit: this.pager.limit,
    //   skip: this.pager.current * this.pager.limit
    // };
    // if (this.sortField) {
    //   config.sort = (this.sortInverse ? '-' : '') + (this.sortField.sort === true ? this.sortField.name : this.sortField.sort);
    // }
    let skip = this.pager.current * this.pager.limit;
    let limit = skip + this.pager.limit;
    let data = this.data;
    // console.log('refreshing...', this.items.length);
    if (this.searchValue) {
      // console.log('filtering...', this.items.length);
      data = data.filter(item => item[this.config.main.name].indexOf(this.searchValue) > -1);
      // console.log('filtered', this.items.length);
    }
    this.items = data.slice(skip, limit) || [];
    // this.items.forEach(item => item.new_price = item.price);
    // this.edit(); ///
    // this.edit(this.items[0]); ///
    this.selectedCount = this.items.filter(item => item.selected).length;
    this.allSelected = !!this.items.length && this.selectedCount === this.items.length;
    this.pager.setCount(data.length);
  }
  next() {
    if (this.pager.next()) {
      this.refresh();
    }
  }
  prev() {
    if (this.pager.prev()) {
      this.refresh();
    }
  }
  limitChange() {
    if (this.pager.setLimit(this.limit)) {
      this.refresh();
    }
  }
  select(item) {
    this.selected = item;
    if (item) {
      item.selected ? this.selectedCount++ : this.selectedCount--;
      this.allSelected = this.selectedCount === this.items.length;
    } else {
      this.items.forEach(thisitem => thisitem.selected = this.allSelected);
      this.selectedCount = this.allSelected ? this.items.length : 0;
    }
    this.selectionChange.emit(this.selectedCount);
  }
  // change(item, field) {
  //   let newField = 'new_' + field;
  //   if (item[field] === item[newField]) {
  //     return;
  //   }
  //   let data = {};
  //   data[field] = item[newField];
  //   this.db.set(this.config.table, item._id, data).subscribe(res => res.ok && (item[field] = item[newField]));
  // }
  sort(field: any) {
    if (this.sortField && this.sortField.name === field.name) {
      this.sortInverse = !this.sortInverse;
    } else {
      this.sortField = field;
      this.sortInverse = true;
    }
    this.data.sort((a, b) => (this.sortField.read(a) === this.sortField.read(b)) ? 0 : ((((this.sortField.read(a) < this.sortField.read(b)) && this.sortInverse) || ((this.sortField.read(a) > this.sortField.read(b)) && !this.sortInverse)) ? 1 : -1));
    this.refresh();
  }

  doDelete(item: any): Promise<any> {
    return new Promise((resolve, reject) => {
      for (let i = this.data.length - 1; i >= 0; i--) {
        if (item ? this.data[i]._id === item._id : this.data[i].selected) {
          this.data.splice(i, 1);
        }
      }
      resolve();
    });
  }
  delete(item: any) {
    if (!item && this.selectedCount === 1) {
      this.items.some(listItem => listItem.selected && (item = listItem));
    }
    let message = item ? this.config.main.read(item) : this.selectedCount + ' item' + (this.selectedCount > 1 ? 's' : '');
    this.dialog.modal().confirm('Are you sure you want to delete ' + message + '?').subscribe(ok => {
      if (ok) {
        this.doDelete(item).then(() => {
          this.refresh();
        });
      }
    });
  }
  doEdit(isNew: boolean, res: any, row?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (isNew) {
        this.config.createID(res).then((res) => {
          this.data.push(res);
          resolve();
        });
      } else {
        row.assign(res);
        resolve();
      }
    });
  }
  edit(row?: any) {
    let isNew = !(row && row._id);
    this.dialog.use(this.config.edit || this.defaultEdit, {columns: this.config.columns, row}, true).subscribe(res => {
      this.doEdit(isNew, res, row).then(() => {
        this.refresh();
      });
    });
  }
  click(row: any, column: any) {
    // console.log('clicked', column);
    if (column.editOnClick) {
      this.edit(row);
    }
    if (column.click) {
      column.click(row, column);
    }
  }
}

@Component({
  template,
  selector: 'md-data-table',
  animations: [ animFade('fade'), animFadeProperty('search', 'true', 'false') ],
  // styleUrls: ['./table.component.scss']
})
export class DataTableComponent extends TableComponent {
  @Input() model: ModelClient<any>;
  constructor(nav: NavigatorService, dialog: DialogService) {
    super(nav, dialog);
  }
  ngOnInit() {
    super.ngOnInit();
    this.model.check().subscribe(() => this.refresh());
  }
  refresh(res?) {
    let config: any = {
      limit: this.pager.limit,
      skip: this.pager.current * this.pager.limit
    };
    let conditions = {};
    if (this.sortField) {
      config.sort = (this.sortInverse ? '-' : '') + (this.sortField.sort === true ? this.sortField.name : this.sortField.sort);
    }
    if (this.searchValue) {
      conditions[this.config.main.name] = { $regex: this.searchValue, $options: 'i' };
    }
    this.model.find(conditions, null, config).subscribe(res => {
      this.items = res.rows;;
      // this.edit(); ///
      // this.edit(this.items[0]); ///
      this.selectedCount = this.items.filter(item => item.selected).length;
      this.allSelected = !!this.items.length && this.selectedCount === this.items.length;
      this.pager.setCount(res.total);
    });
  }
  doDelete(item: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (item && item._id) {
        this.model.remove(item._id).subscribe(() => resolve());
      } else {
        let i = this.items.length;
        let deleteNext = function() {};
        while (i > 0) {
          i--;
          if (this.items[i].selected) {
            this.model.remove(this.items[i]._id).subscribe(() => i > 0 ? deleteNext() : resolve());
          }
        }
      }
    });
  }
  doEdit(isNew: boolean, res: any, row?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (isNew) {
        this.model.create(res).subscribe(() => resolve());
      } else {
        this.model.set(row._id, res).subscribe(() => resolve());
      }
    });
  }
}
