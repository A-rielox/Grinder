import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
   selector: 'app-card-form',
   templateUrl: './card-form.component.html',
   styleUrls: ['./card-form.component.css'],
})
export class CardFormComponent implements OnInit {
   // 🟡 para evitar q crea q es AbstractForm primero defino las FormControl y luego el FormGroup
   // 🟡 el nonNullable es p' evitar q sea null y en la .html poder poner con confianza el " ! " al pasar la prop al child ( [cardNumber]="cardForm.get('cardNumber')!.value" )
   
   name = new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
   });
   cardNumber = new FormControl('', {
      validators: [
         Validators.required,
         Validators.minLength(16),
         Validators.maxLength(16),
      ],
      nonNullable: true,
   });
   expiration = new FormControl('', {
      validators: [
         Validators.required,
         // 01/02 mes año
         Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
      ],
      nonNullable: true,
   });
   securityCode = new FormControl('', {
      validators: [
         Validators.required,
         Validators.minLength(3),
         Validators.maxLength(3),
      ],
      nonNullable: true,
   });

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

   onResetClick() {
      this.cardForm.reset();
   }

   // showErrors() {
   //    return (
   //       !this.cardForm.controls.name.valid &&
   //       this.cardForm.controls.name.touched
   //    );
   // }
}
