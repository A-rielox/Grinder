import { Component, OnInit } from '@angular/core';
import {
   AsyncValidator,
   AsyncValidatorFn,
   FormControl,
   FormGroup,
   Validators,
} from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
   // ------------- FORM-CONTROLS
   userName = new FormControl('', {
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
         userName: this.userName,
         password: this.password,
         passwordConfirmation: this.passwordConfirmation,
      },
      //                       👇
      { validators: [Validators.required, this.matchPassword.validate] }
   );

   constructor(
      private matchPassword: MatchPassword,
      private uniqueUsername: UniqueUsername
   ) {}

   ngOnInit(): void {}
}
