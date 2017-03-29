import { Directive, ElementRef, Output, Input, EventEmitter, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[time-value]'
})
export class TimeEditorDirective implements OnInit {
  @Output() timeChange: EventEmitter<Date> = new EventEmitter(true);
  @Input() time: Date;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (typeof this.time === 'undefined') {
      this.time = new Date();
      this.timeChange.emit(this.time);
    }
    if (!(this.time instanceof Date)) {
      this.time = new Date(this.time);
      this.timeChange.emit(this.time);
    }
    this.el.nativeElement.value = this.time.getHours() + ':' + this.time.getMinutes();
  }
  @HostListener('change') onChange(event) {
    let value = this.el.nativeElement.value.split(':');
    this.time.setHours(value[0]);
    this.time.setMinutes(value[1]);
    this.timeChange.emit(this.time);
  }

}