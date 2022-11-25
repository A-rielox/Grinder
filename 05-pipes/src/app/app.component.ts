import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent {
   // DECLARAR
   name?: string;
   date?: string;
   amount?: number;
   height?: number;
   miles?: number;

   // INICIALIZAR
   car = {
      marca: 'mazda',
      modelo: 'mazda2',
      year: 2023,
   };

   onNameChange(name: string) {
      this.name = name;
   }

   onDateChange(date: string) {
      this.date = date;
   }

   onAmountChange(amount: string) {
      this.amount = parseFloat(amount);
   }

   onHeightChange(value: string) {
      this.height = parseFloat(value);
   }

   onMilesChange(value: string) {
      this.miles = parseFloat(value);
   }
}
