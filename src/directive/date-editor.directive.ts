import { Directive, ElementRef, Output, Input, EventEmitter, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[date-value]'
})
export class DateEditorDirective implements OnInit {
  @Output() dateChange: EventEmitter<Date> = new EventEmitter(true);
  @Input() date: Date;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    if (typeof this.date === 'undefined') {
      this.date = new Date();
      this.dateChange.emit(this.date);
    }
    if (!(this.date instanceof Date)) {
      this.date = new Date(this.date);
      this.dateChange.emit(this.date);
    }
    this.el.nativeElement.value = this.date.toISOString().substring(0, 10);
  }
  @HostListener('change') onChange(event) {
    let value = this.el.nativeElement.value.split('-');
    this.date.setFullYear(value[0], value[1] - 1, value[2]);
    this.dateChange.emit(this.date);
  }

}