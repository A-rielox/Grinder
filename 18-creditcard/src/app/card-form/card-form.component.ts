import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
   selector: 'app-card-form',
   templateUrl: './card-form.component.html',
   styleUrls: ['./card-form.component.css'],
})
export class CardFormComponent implements OnInit {
   name = new FormControl('', [Validators.required, Validators.minLength(3)]);
   cardNumber = new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
   ]);
   expiration = new FormControl('', [
      Validators.required,
      // 01/02 mes año
      Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
   ]);
   securityCode = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
   ]);

   cardForm = new FormGroup({
      name: this.name,
      cardNumber: this.cardNumber,
      expiration: this.expiration,
      securityCode: this.securityCode,
   });

   constructor() {}

   ngOnInit(): void {}

   onSubmit() {
      console.log(this.cardForm.controls);
   }

   // showErrors() {
   //    return (
   //       !this.cardForm.controls.name.valid &&
   //       this.cardForm.controls.name.touched
   //    );
   // }
}
