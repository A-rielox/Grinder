import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Directive({
   selector: '[appAnswerHighlight]',
})
export class AnswerHighlightDirective {
   constructor(private el: ElementRef, private controlName: NgControl) {
      // console.log(this.controlName); el input
   }

   ngOnInit() {
      //💥💥
      // me da acceso al parent ( el FormGroup ) del input en q esta mi directiva
      // si lo pongo en el constructor => " this.controlName.control " es " undefined " xq todavia no se a hecho el binding entre el html y .ts
      //
      // console.log(this.controlName.control?.parent);
      //       value: {a: 1, b: 0, answer: ''}

      this.controlName.control?.parent?.valueChanges
         .pipe(map(({ a, b, answer }) => Math.abs((a + b - +answer) / (a + b))))
         .subscribe((value) => {
            if (value < 0.2) {
               this.el.nativeElement.classList.add('close');
            } else {
               this.el.nativeElement.classList.remove('close');
            }

            // sin pipe()
            // trigger c/q cambia el valor de alguno
            // console.log(value); {a: 6, b: 4, answer: '123'}
         });
   }
}
