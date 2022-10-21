import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
   selector: 'app-signin',
   templateUrl: './signin.component.html',
   styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
   // ------------- FORM-CONTROLS
   username = new FormControl('', {
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

   // ------------- FORM-GROUP
   authForm = new FormGroup({
      username: this.username,
      password: this.password,
   });

   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit(): void {}

   onSubmit() {
      console.log('SIGN IN FORM', this.authForm.value);
      if (this.authForm.invalid) {
         return;
      }

      this.authService.signin(<any>this.authForm.value).subscribe({
         next: (response) => {
            // navigate to
            this.router.navigateByUrl('/inbox');
         },
         error: ({ error }) => {
            if (error.username || error.password) {
               // va a meter un error a los " errores de la form "
               this.authForm.setErrors({ credentials: true });
            } else {
               this.authForm.setErrors({ unknownError: true });
            }
         },
      });
   }
}
