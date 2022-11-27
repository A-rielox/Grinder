import { AbstractControl } from '@angular/forms';
// ng g class MathValidators --skip-tests true
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
   //
   // export class MathValidators {
   //     static addition(form: AbstractControl) {
   //        const { a, b, answer } = form.value;
   //
   //        if (a + b === parseInt(answer)) {
   //           return null; // "null" p'q sea valid la form
   //        }
   //
   //        return { addition: true };
   //     }
   // }
   //
   // en la validacion de la forma la llamaba sin argumantos
   // mathForm = new FormGroup(
   //    {
   //       a: this.a,
   //       b: this.b,
   //       answer: this.answer,
   //    },
   //    [MathValidators.addition]
   // );
}
