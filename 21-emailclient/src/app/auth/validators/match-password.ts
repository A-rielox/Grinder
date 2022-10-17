import { Injectable } from '@angular/core';
import { FormGroup, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
   // puede ser FormGroup o FormControl dependiendo d lo q quiera validar
   validate(formGroup: FormGroup) {
      // 🔴
      const { password, passwordConfirmation } = formGroup.value;
      if (password === passwordConfirmation) {
         return null;
      } else {
         return { passwordsDontMatch: true };
      }
   }
}

// 🔴 el objeto q retorne se va a asignar a la prop errors del FormGroup ( o form control si es lo q estoy usando )
