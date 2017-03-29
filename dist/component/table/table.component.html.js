"use strict";
exports.template = "<div class=\"table\">\n  <ng-content select=\"[md-table-title]\"></ng-content>\n  <div class=\"search\" *ngIf=\"showSearch && selectedCount === 0\" [@fade]=\"showSearch && selectedCount === 0\">\n    <md-icon>search</md-icon>\n    <md-input-container spacer>\n      <input mdInput auto-focus [placeholder]=\"config.main.text\" [(ngModel)]=\"searchValue\" (ngModelChange)=\"keypress.next(searchValue)\">\n    </md-input-container>\n    <button md-icon-button (click)=\"showSearch = false; searchValue = ''; refresh()\"><md-icon>close</md-icon></button>\n  </div>\n  <div class=\"actions\" [class.selected]=\"selectedCount > 0\" [class.is-hidden]=\"showSearch\" [@search]=\"(showSearch && selectedCount === 0) ? 'true' : 'false'\">\n    <ng-content select=\"[md-table-actions-left]\"></ng-content>\n    <div md-table-actions-left>\n      <!--[LEFT]-->\n    </div>\n    <div class=\"left\">\n      <div md-table-actions-default *ngIf=\"!selectedCount\" [@fade]=\"!selectedCount\">\n        <!--[LEFTDEFAULT]-->\n        <div>\n          <button md-button color=\"primary\" (click)=\"edit()\">ADD</button>\n        </div>\n      </div>\n      <div md-table-actions-selected *ngIf=\"selectedCount\" [@fade]=\"selectedCount\"><div>\n        <!--[LEFTSELECTED]-->\n        <span selection>{{selectedCount}} item{{selectedCount > 1 ? 's' : ''}} selected</span>\n      </div></div>\n    </div>\n    <div class=\"center\">\n      <div *ngIf=\"!selectedCount\" [@fade]=\"!selectedCount\">\n        <ng-content select=\"[md-table-actions-default]\"></ng-content>\n      </div>\n      <div *ngIf=\"selectedCount\" [@fade]=\"selectedCount\">\n        <ng-content select=\"[md-table-actions-selected]\"></ng-content>\n      </div>\n    </div>\n    <div class=\"right\">\n      <div md-table-actions-default *ngIf=\"!selectedCount\" [@fade]=\"!selectedCount\"><div>\n        <!--[RIGHTDEFAULT]-->\n        <button md-icon-button (click)=\"showSearch = true\"><md-icon>filter_list</md-icon></button>\n      </div></div>\n      <div md-table-actions-selected *ngIf=\"selectedCount\" [@fade]=\"selectedCount\"><div>\n        <!--[RIGHTSELECTED]-->\n        <button md-icon-button [@fade]=\"selectedCount === 1\" *ngIf=\"selectedCount === 1\" (click)=\"edit(selected)\"><md-icon>edit</md-icon></button>\n        <button md-icon-button (click)=\"delete()\"><md-icon>delete</md-icon></button>\n      </div></div>\n    </div>\n    <ng-content select=\"[md-table-actions-right]\"></ng-content>\n    <div md-table-actions-right>\n      <!--[RIGHT]-->\n      <!--<button md-icon-button><md-icon>more_vert</md-icon></button>-->\n    </div>\n  </div>\n  <div class=\"content\" #tableBody>\n    <table>\n      <thead>\n        <div class=\"header\" [class.shaded]=\"shaded\" [style.top]=\"scrollValue + 'px'\"></div>\n        <tr>\n          <td class=\"isid\" *ngIf=\"config.checkbox\" [style.top]=\"scrollValue + 'px'\">\n            <md-checkbox [(ngModel)]=\"allSelected\" (change)=\"select(false)\" color=\"primary\"></md-checkbox>\n          </td>\n          <td *ngFor=\"let column of config.columns\" [class.sort]=\"!!column.sort\" [class.center]=\"column.center\" [class.main]=\"column.main\" [class.isid]=\"column.isid\" [attr.sorted]=\"(column.sort && sortField && (sortField.name === column.name)) ? (sortInverse ? 'down' : 'up') : null\" (click)=\"column.sort && sort(column)\" [style.top]=\"scrollValue + 'px'\">{{column.text}}</td>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let item of items\" [class.selected]=\"item.selected\">\n          <td class=\"isid\" *ngIf=\"config.checkbox\"><md-checkbox [(ngModel)]=\"item.selected\" (change)=\"select(item)\" color=\"primary\"></md-checkbox></td>\n          <td *ngFor=\"let column of config.columns\" [class.center]=\"column.centerData\" [class.main]=\"column.main\" [class.isid]=\"column.isid\" [ngSwitch]=\"column.type\" [class.pointer]=\"config.click || column.click || (config.edit && column.editOnClick)\" (click)=\"click(item, column); config.click && config.click(item)\">\n            <span empty *ngIf=\"(column.placeholder) && ((column.read(item) === null) || (column.read(item) === '') || (column.read(item) === undefined))\">{{column.placeholder}}</span>\n            <span *ngSwitchCase=\"'date'\">{{column.read(item) | date}}</span>\n            <span *ngSwitchCase=\"'time'\">{{column.read(item) | date:'HH:mm'}}</span>\n            <!--<md-checkbox *ngSwitchCase=\"'check'\" [(ngModel)]=\"item[column.name]\" color=\"primary\"></md-checkbox>-->\n            <span *ngSwitchCase=\"'yesno'\">{{(column.yesno || ['No', 'Yes'])[column.read(item) ? 1 : 0]}}</span>\n            <md-icon *ngSwitchCase=\"'icons'\">{{(column.icons || ['', 'check'])[column.read(item) ? 1 : 0]}}</md-icon>\n            <span *ngSwitchCase=\"'rating'\">\n              <md-icon inline font-size>{{column.read(item) > 0 ? 'star' : 'star_border'}}</md-icon>\n              <md-icon inline font-size>{{column.read(item) > 1 ? 'star' : 'star_border'}}</md-icon>\n              <md-icon inline font-size>{{column.read(item) > 2 ? 'star' : 'star_border'}}</md-icon>\n              <md-icon inline font-size>{{column.read(item) > 3 ? 'star' : 'star_border'}}</md-icon>\n              <md-icon inline font-size>{{column.read(item) > 4 ? 'star' : 'star_border'}}</md-icon>\n            </span>\n            <span *ngSwitchDefault>{{column.read(item)}}</span>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  <div class=\"footer\">\n    <ng-content select=\"[md-table-footer]\"></ng-content>\n    <span spacer></span>\n    <span>Rows per page: </span>\n    <md-select [(ngModel)]=\"limit\" (onClose)=\"limitChange()\"><md-option *ngFor=\"let pages of pagesOption\" [value]=\"pages\">{{pages}}</md-option></md-select>\n    <span>{{pager.firstElement}}-{{pager.lastElement}} of {{pager.count}}</span>\n    <button md-icon-button (click)=\"prev()\" [disabled]=\"pager.current <= 0\"><md-icon>chevron_left</md-icon></button>\n    <button md-icon-button (click)=\"next()\" [disabled]=\"pager.current >= pager.pagesCount - 1\"><md-icon>chevron_right</md-icon></button>\n  </div>\n</div>\n";
//# sourceMappingURL=table.component.html.js.map