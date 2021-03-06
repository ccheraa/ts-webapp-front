export const template = `<!--<md-input-container>
  <input mdInput placeholder="Name" [(ngModel)]="edited.name">
</md-input-container>
<md-input-container>
  <input mdInput type="date" placeholder="Date of birth" [(ngModel)]="dob">
</md-input-container>
<md-input-container>
  <input mdInput placeholder="Date of birth" [(ngModel)]="edited.dob">
</md-input-container>
<md-checkbox [(ngModel)]="edited.male" color="primary">{{edited.male ? 'Male' : 'Female'}}</md-checkbox>-->
<!--<button md-button (click)="">Reset</button>-->
<div *ngFor="let column of data.columns" [ngSwitch]="column.type">
  <!--<span *ngSwitchCase="'date'">{{column.read(item) | date:''}}</span>-->
  <!--<span *ngSwitchCase="'time'">{{column.read(item) | date:'HH:mm'}}</span>-->
  <!--<span *ngSwitchCase="'yesno'">{{(column.yesno || ['No', 'Yes'])[column.read(item) ? 1 : 0]}}</span>-->
  <!--<md-icon *ngSwitchCase="'icons'">{{(column.icons || ['', 'check'])[column.read(item) ? 1 : 0]}}</md-icon>-->
  <!--<span *ngSwitchCase="'rating'">
    <md-icon inline font-size>{{column.read(item) > 0 ? 'star' : 'star_border'}}</md-icon>
    <md-icon inline font-size>{{column.read(item) > 1 ? 'star' : 'star_border'}}</md-icon>
    <md-icon inline font-size>{{column.read(item) > 2 ? 'star' : 'star_border'}}</md-icon>
    <md-icon inline font-size>{{column.read(item) > 3 ? 'star' : 'star_border'}}</md-icon>
    <md-icon inline font-size>{{column.read(item) > 4 ? 'star' : 'star_border'}}</md-icon>
  </span>-->
  <md-checkbox *ngSwitchCase="(column.type === 'yesno' || column.type === 'icons') ? column.type : ''" [(ngModel)]="edited[column.name]" color="primary">
    <span><b>{{column.text}}:</b></span> {{(column[column.type] || ['No', 'Yes'])[column.read(edited) ? 1 : 0]}}
  </md-checkbox>
  <md-input-container *ngSwitchCase="'date'">
    <input mdInput type="date" date-value [placeholder]="column.placeholder || column.text" [(date)]="edited[column.name]">
  </md-input-container>
  <md-input-container *ngSwitchCase="'time'">
    <input mdInput type="time" time-value [placeholder]="column.placeholder || column.text" [(time)]="edited[column.name]">
  </md-input-container>
  <md-input-container *ngSwitchDefault>
    <input mdInput [placeholder]="column.placeholder || column.text" [(ngModel)]="edited[column.name]">
  </md-input-container>
</div>
<br>
<button md-button (click)="cancel()">cancel</button>
<button md-button color="primary" (click)="ok()">Ok</button>
`;