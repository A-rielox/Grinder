import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from '../email';

@Component({
   selector: 'app-email-form',
   templateUrl: './email-form.component.html',
   styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
   @Input() email!: Email;
   @Output() emailSubmit = new EventEmitter();

   to = new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
   });
   // ⚠ marcarla como disabled la quita de la form ( NO aparece en this.emailForm.value ), p'q me lo entrege es con " this.emailForm.getRawValue() "
   from = new FormControl(
      { value: '', disabled: true }, // ⚠
      {
         nonNullable: true,
      }
   );
   subject = new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
   });
   text = new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
   });
   emailForm = new FormGroup({
      to: this.to,
      from: this.from,
      subject: this.subject,
      text: this.text,
   });

   constructor() {}

   ngOnInit(): void {
      const { subject, from, to, text } = this.email;

      this.emailForm.setValue({
         to: to,
         from: from,
         subject: subject,
         text: text,
      });
      // a setValue() le tengo q pasar todos los valores de la form, si solo quiero sobreescribir algunos ( xq pueden ser muchos inputs ) ocupo .patchValue({ ... })
   }

   onSubmit() {
      if (this.emailForm.invalid) return;

      // console.log(this.emailForm.value); // NO incluye valores disabled
      // console.log(this.emailForm.getRawValue()); // incluye valores disabled

      this.emailSubmit.emit(this.emailForm.value);
   }
}
