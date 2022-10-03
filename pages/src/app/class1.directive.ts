import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appClass1]',
})
export class ClassDirective1 {
  constructor(private element: ElementRef) {}

  // para q detecte el cambio y aplique el color ( para saltar los lifecycles )
  // @Input() set backgroundColor(color: string) {
  //   this.element.nativeElement.style.backgroundColor = color;
  // }
  @Input('appClass1') set backgroundColor(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }
}

//
// this.element.nativeElement ---> elemento en q pongo la directiva
