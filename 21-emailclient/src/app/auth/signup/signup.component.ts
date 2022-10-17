import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';

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

   constructor(private matchPassword: MatchPassword) {}

   ngOnInit(): void {}
}
