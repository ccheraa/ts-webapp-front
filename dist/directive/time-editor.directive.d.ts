import { ElementRef, EventEmitter, OnInit } from '@angular/core';
export declare class TimeEditorDirective implements OnInit {
    private el;
    timeChange: EventEmitter<Date>;
    time: Date;
    constructor(el: ElementRef);
    ngOnInit(): void;
    onChange(event: any): void;
}
