import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MathValidators } from '../math-validators';

@Component({
   selector: 'app-equation',
   templateUrl: './equation.component.html',
   styleUrls: ['./equation.component.css'],
})
export class EquationComponent {
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
      [
         // validacion de la FORM
         MathValidators.addition,
      ]
   );

   randomNumber() {
      return Math.floor(Math.random() * 10);
   }
}
