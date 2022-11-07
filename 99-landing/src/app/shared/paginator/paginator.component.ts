import { Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'app-paginator',
   templateUrl: './paginator.component.html',
   styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
   @Input() numberOfPages: number;
   pageOptions: number[];

   currentPage: number = 1;

   constructor() {}

   ngOnInit(): void {
      this.pageOptions = [
         this.currentPage - 2,
         this.currentPage - 1,
         this.currentPage,
         this.currentPage + 1,
         this.currentPage + 2,
      ].filter(
         (pageNumber) => pageNumber >= 1 && pageNumber <= this.numberOfPages
      );
   }
}
