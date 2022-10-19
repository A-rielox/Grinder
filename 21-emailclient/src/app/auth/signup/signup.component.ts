import { Component, OnInit } from '@angular/core';
import {
   AsyncValidatorFn,
   FormControl,
   FormGroup,
   Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

interface SignupCredentials {
   username: string;
   password: string;
   passwordConfirmation: string;
}

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
   // ------------- FORM-CONTROLS
   username = new FormControl('', {
      validators: [
         Validators.required,
         Validators.minLength(3),
         Validators.maxLength(20),
         Validators.pattern(/^[a-z0-9]+$/),
      ],
      asyncValidators: this.uniqueUsername.validate as AsyncValidatorFn,
      nonNullable: true,
   });
   password = new FormControl('', {
      validators: [
         Validators.required,
         Validators.minLength(4),
         Validators.maxLength(20),
      ],
      nonNullable: true,
   });
   passwordConfirmation = new FormControl('', {
      validators: [
         Validators.required,
         Validators.minLength(4),
         Validators.maxLength(20),
      ],
      nonNullable: true,
   });

   // ------------- FORM-GROUP
   authForm = new FormGroup(
      {
         username: this.username,
         password: this.password,
         passwordConfirmation: this.passwordConfirmation,
      },
      //                       👇
      { validators: [Validators.required, this.matchPassword.validate] }
   );

   constructor(
      private matchPassword: MatchPassword,
      private uniqueUsername: UniqueUsername,
      private authService: AuthService
   ) {}

   ngOnInit(): void {}

   onSubmit() {
      if (this.authForm.invalid) {
         return;
      }

      console.log(this.authForm.value);
      //{username: 'lkjoiuyth', password: '1234', passwordConfirmation: '1234'}

      // en lugar de escribir el pipe con el catchError ( p' la respuesta de nombre ocupado ) pongo el {} en el subscribe p' la accion cuando venga el error
      // TENGO Q ESCRIBIRLAS COMO ARROW FCN PARA PODER OCUPAR " this "
      this.authService
         .signup(<SignupCredentials>this.authForm.value)
         .subscribe({
            next: (response) => {
               // navigate to some other route
            },
            // complete(){},
            error: (err) => {
               if (!err.status) {
                  // va a meter un error a los " errores de la form "
                  this.authForm.setErrors({ noConnection: true });
               } else {
                  this.authForm.setErrors({ unknownError: true });
               }
            },
         });
   }
}
