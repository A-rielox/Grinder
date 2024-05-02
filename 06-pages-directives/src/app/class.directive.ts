import { Directive, ElementRef, Input } from '@angular/core';

//      yellow  MAS DIRECTIVES EN EL JUEGO DE MATH  yellow
//                yellow  una con input  yellow

@Directive({
  selector: '[appClass]',
})
export class ClassDirective {
  constructor(private element: ElementRef) {} // element es el elemento en el html en el q pongo esta directiva

  @Input('appClass') set classNames(classObj: any) {
    // for in itera sobre las keys de un object
    for (const key in classObj) {
      if (classObj[key]) {
        this.element.nativeElement.classList.add(key);
      } else {
        this.element.nativeElement.classList.remove(key);
      }
    }
  }
}
