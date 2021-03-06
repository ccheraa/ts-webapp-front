export const template = `<div class="table">
  <ng-content select="[md-table-title]"></ng-content>
  <div class="search" *ngIf="showSearch && selectedCount === 0" [@fade]="showSearch && selectedCount === 0">
    <md-icon>search</md-icon>
    <md-input-container spacer>
      <input mdInput auto-focus [placeholder]="config.main.text" [(ngModel)]="searchValue" (ngModelChange)="keypress.next(searchValue)">
    </md-input-container>
    <button md-icon-button (click)="showSearch = false; searchValue = ''; refresh()"><md-icon>close</md-icon></button>
  </div>
  <div class="actions" [class.selected]="selectedCount > 0" [class.is-hidden]="showSearch" [@search]="(showSearch && selectedCount === 0) ? 'true' : 'false'">
    <ng-content select="[md-table-actions-left]"></ng-content>
    <div md-table-actions-left>
      <!--[LEFT]-->
    </div>
    <div class="left">
      <div md-table-actions-default *ngIf="!selectedCount" [@fade]="!selectedCount">
        <!--[LEFTDEFAULT]-->
        <div>
          <button md-button color="primary" (click)="edit()">ADD</button>
        </div>
      </div>
      <div md-table-actions-selected *ngIf="selectedCount" [@fade]="selectedCount"><div>
        <!--[LEFTSELECTED]-->
        <span selection>{{selectedCount}} item{{selectedCount > 1 ? 's' : ''}} selected</span>
      </div></div>
    </div>
    <div class="center">
      <div *ngIf="!selectedCount" [@fade]="!selectedCount">
        <ng-content select="[md-table-actions-default]"></ng-content>
      </div>
      <div *ngIf="selectedCount" [@fade]="selectedCount">
        <ng-content select="[md-table-actions-selected]"></ng-content>
      </div>
    </div>
    <div class="right">
      <div md-table-actions-default *ngIf="!selectedCount" [@fade]="!selectedCount"><div>
        <!--[RIGHTDEFAULT]-->
        <button md-icon-button (click)="showSearch = true"><md-icon>filter_list</md-icon></button>
      </div></div>
      <div md-table-actions-selected *ngIf="selectedCount" [@fade]="selectedCount"><div>
        <!--[RIGHTSELECTED]-->
        <button md-icon-button [@fade]="selectedCount === 1" *ngIf="selectedCount === 1" (click)="edit(selected)"><md-icon>edit</md-icon></button>
        <button md-icon-button (click)="delete()"><md-icon>delete</md-icon></button>
      </div></div>
    </div>
    <ng-content select="[md-table-actions-right]"></ng-content>
    <div md-table-actions-right>
      <!--[RIGHT]-->
      <!--<button md-icon-button><md-icon>more_vert</md-icon></button>-->
    </div>
  </div>
  <div class="content" #tableBody>
    <table>
      <thead>
        <div class="header" [class.shaded]="shaded" [style.top]="scrollValue + 'px'"></div>
        <tr>
          <td class="isid" *ngIf="config.checkbox" [style.top]="scrollValue + 'px'">
            <md-checkbox [(ngModel)]="allSelected" (change)="select(false)" color="primary"></md-checkbox>
          </td>
          <td *ngFor="let column of config.columns" [class.sort]="!!column.sort" [class.center]="column.center" [class.main]="column.main" [class.isid]="column.isid" [attr.sorted]="(column.sort && sortField && (sortField.name === column.name)) ? (sortInverse ? 'down' : 'up') : null" (click)="column.sort && sort(column)" [style.top]="scrollValue + 'px'">{{column.text}}</td>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of items" [class.selected]="item.selected">
          <td class="isid" *ngIf="config.checkbox"><md-checkbox [(ngModel)]="item.selected" (change)="select(item)" color="primary"></md-checkbox></td>
          <td *ngFor="let column of config.columns" [class.center]="column.centerData" [class.main]="column.main" [class.isid]="column.isid" [ngSwitch]="column.type" [class.pointer]="config.click || column.click || (config.edit && column.editOnClick)" (click)="click(item, column); config.click && config.click(item)">
            <span empty *ngIf="(column.placeholder) && ((column.read(item) === null) || (column.read(item) === '') || (column.read(item) === undefined))">{{column.placeholder}}</span>
            <span *ngSwitchCase="'date'">{{column.read(item) | date}}</span>
            <span *ngSwitchCase="'time'">{{column.read(item) | date:'HH:mm'}}</span>
            <!--<md-checkbox *ngSwitchCase="'check'" [(ngModel)]="item[column.name]" color="primary"></md-checkbox>-->
            <span *ngSwitchCase="'yesno'">{{(column.yesno || ['No', 'Yes'])[column.read(item) ? 1 : 0]}}</span>
            <md-icon *ngSwitchCase="'icons'">{{(column.icons || ['', 'check'])[column.read(item) ? 1 : 0]}}</md-icon>
            <span *ngSwitchCase="'rating'">
              <md-icon inline font-size>{{column.read(item) > 0 ? 'star' : 'star_border'}}</md-icon>
              <md-icon inline font-size>{{column.read(item) > 1 ? 'star' : 'star_border'}}</md-icon>
              <md-icon inline font-size>{{column.read(item) > 2 ? 'star' : 'star_border'}}</md-icon>
              <md-icon inline font-size>{{column.read(item) > 3 ? 'star' : 'star_border'}}</md-icon>
              <md-icon inline font-size>{{column.read(item) > 4 ? 'star' : 'star_border'}}</md-icon>
            </span>
            <span *ngSwitchDefault>{{column.read(item)}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="footer">
    <ng-content select="[md-table-footer]"></ng-content>
    <span spacer></span>
    <span>Rows per page: </span>
    <md-select [(ngModel)]="limit" (onClose)="limitChange()"><md-option *ngFor="let pages of pagesOption" [value]="pages">{{pages}}</md-option></md-select>
    <span>{{pager.firstElement}}-{{pager.lastElement}} of {{pager.count}}</span>
    <button md-icon-button (click)="prev()" [disabled]="pager.current <= 0"><md-icon>chevron_left</md-icon></button>
    <button md-icon-button (click)="next()" [disabled]="pager.current >= pager.pagesCount - 1"><md-icon>chevron_right</md-icon></button>
  </div>
</div>
`;