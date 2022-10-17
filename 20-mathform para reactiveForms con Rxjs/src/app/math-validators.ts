import { AbstractControl } from '@angular/forms';

export class MathValidators {
   // ( statics no tienen acceso a props de su clase )

   static addition(target: string, sourceOne: string, sourceTwo: string) {
      return (form: AbstractControl) => {
         const sum = form.value[target];
         const firstNum = form.value[sourceOne];
         const secondNum = form.value[sourceTwo];

         if (firstNum + secondNum === parseInt(sum)) {
            return null; // "null" p'q sea valid la form
         }

         return { addition: true };
      };
   }

   // NO reusable por sumas con otros nombres de variables
   // static addition(form: AbstractControl) {
   //    const { a, b, answer } = form.value;

   //    if (a + b === parseInt(answer)) {
   //       return null; // "null" p'q sea valid la form
   //    }

   //    return { addition: true };
   // }
}
