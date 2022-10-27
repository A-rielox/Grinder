import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
   selector: 'app-input',
   templateUrl: './input.component.html',
   styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
   @Input() control: FormControl = new FormControl();
   @Input() label: string = '';
   @Input() inputType: string = 'text';
   @Input() controlType = 'input';

   constructor() {}

   ngOnInit(): void {}

   // showErrors() {
   //    const { dirty, touched, errors } = this.control;

   //    return dirty && touched && errors;
   // }
}
