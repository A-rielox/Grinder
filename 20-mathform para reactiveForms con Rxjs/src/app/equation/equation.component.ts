import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { delay, filter, scan } from 'rxjs';
import { MathValidators } from '../math-validators';

@Component({
   selector: 'app-equation',
   templateUrl: './equation.component.html',
   styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
   secondsPerSolution = 0;

   a = new FormControl(this.randomNumber(), {
      validators: [],
      nonNullable: true,
   });
   b = new FormControl(this.randomNumber(), {
      validators: [],
      nonNullable: true,
   });
   answer = new FormControl('', { validators: [], nonNullable: true });

   mathForm = new FormGroup(
      {
         a: this.a,
         b: this.b,
         answer: this.answer,
      },
      // validacion de la FORM
      [
         MathValidators.addition('answer', 'a', 'b'),

         // NO reusable por sumas con otros nombres de variables
         // MathValidators.addition,
      ]
   );

   // scan es como 'reduce', scan((acc,curr) => acc + curr, 0 )
   // 1  3  5 --->
   // 1  4  9 --->

   // " this.mathForm.statusChanges " emite un evento (es un EventEmitter) cada q cambia el status de la form de valid a invalid ( cada q se ingresa un valor )
   //
   // con .valueChanges.subscribe() haria una operacion cada vez q cambia el valor del input
   //
   ngOnInit() {
      this.mathForm.statusChanges
         .pipe(
            filter((value) => value === 'VALID'),
            delay(300),
            scan(
               (acc, curr) => {
                  return {
                     numberSolved: acc.numberSolved + 1,
                     startTime: acc.startTime,
                  };
               },
               { numberSolved: 0, startTime: new Date() }
            )
         )
         .subscribe(({ numberSolved, startTime }) => {
            this.secondsPerSolution =
               (new Date().getTime() - startTime.getTime()) /
               numberSolved /
               1000;

            this.mathForm.setValue({
               a: this.randomNumber(),
               b: this.randomNumber(),
               answer: '',
            });
            // a setValue() le tengo q pasar todos los valores de la form, si solo quiero resetear algunos ( xq pueden ser muchos inputs ) ocupo .patchValue({ ... })
         });
   }

   randomNumber() {
      return Math.floor(Math.random() * 10);
   }
}

/*          LA MAS SIMPLE SIN TANTO EN EL PIPE

ngOnInit() {
      this.mathForm.statusChanges.subscribe((value) => {
         // console.log(value); devuelve si la form es VALID o INVALID
         if (value === 'INVALID') return;

         this.mathForm.setValue({
            a: this.randomNumber(),
            b: this.randomNumber(),
            answer: '',
         });
         // a setValue() le tengo q pasar todos los valores de la form, si solo quiero resetear algunos ( xq pueden ser muchos inputs ) ocupo .patchValue({ ... })
      });
   }

*/
