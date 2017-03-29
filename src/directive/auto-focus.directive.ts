import { Directive, ElementRef, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: '[auto-focus]'
})
export class AutoFocusDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);
  }

}