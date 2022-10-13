import { AbstractControl } from '@angular/forms';

export class MathValidators {
   // ( statics no tienen acceso a props de su clase )

   static addition(form: AbstractControl) {
      const { a, b, answer } = form.value;
      if (a + b === parseInt(answer)) {
         return null; // "null" p'q sea valid la form
      }
      return { addition: true };
   }
}
