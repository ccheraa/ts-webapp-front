import { ElementRef, EventEmitter, OnInit } from '@angular/core';
export declare class DateEditorDirective implements OnInit {
    private el;
    dateChange: EventEmitter<Date>;
    date: Date;
    constructor(el: ElementRef);
    ngOnInit(): void;
    onChange(event: any): void;
}
