import { Component, OnInit, Input } from '@angular/core';

// interface pagesType {
//    title: string;
//    snippet: string;
//    pageid: number;
//    wordcount: number;
// }

@Component({
   selector: 'app-page-list',
   templateUrl: './page-list.component.html',
   styleUrls: ['./page-list.component.css'],
})
export class PageListComponent implements OnInit {
   @Input() pages /* : pagesType[] */ = [];

   constructor() {}

   ngOnInit(): void {}
}
