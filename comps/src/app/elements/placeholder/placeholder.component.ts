import { Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'app-placeholder',
   templateUrl: './placeholder.component.html',
   styleUrls: ['./placeholder.component.css'],
})
export class PlaceholderComponent implements OnInit {
   @Input() header = true;
   @Input() lines = 2;

   constructor() {}

   ngOnInit(): void {}
}
