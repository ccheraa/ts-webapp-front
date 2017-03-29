import { ElementRef, OnInit, Renderer } from '@angular/core';
export declare class AutoFocusDirective implements OnInit {
    private el;
    private renderer;
    constructor(el: ElementRef, renderer: Renderer);
    ngOnInit(): void;
}
