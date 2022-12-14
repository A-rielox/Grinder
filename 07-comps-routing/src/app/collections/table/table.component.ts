import { Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'app-table',
   templateUrl: './table.component.html',
   styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
   @Input() classNames: string = '';

   @Input() data: { [key: string]: string | number }[] = [];
   @Input() headers: { [key: string]: string }[] = [];

   constructor() {}

   ngOnInit(): void {}
}
