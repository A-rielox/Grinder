import { Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'app-accordion',
   templateUrl: './accordion.component.html',
   styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent implements OnInit {
   @Input() items: { title: string; content: string }[] = [];
   openItemIndex = 0;

   constructor() {}

   ngOnInit(): void {}

   onClick(i: number) {
      if (i === this.openItemIndex) {
         this.openItemIndex = -1;
      } else {
         this.openItemIndex = i;
      }
   }
}
