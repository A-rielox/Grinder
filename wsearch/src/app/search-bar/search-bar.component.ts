import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
   selector: 'app-search-bar',
   templateUrl: './search-bar.component.html',
   styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
   @Output() submitted = new EventEmitter<string>();
   term: string = '';

   constructor() {}

   ngOnInit(): void {}

   onFormSubmit(e: SubmitEvent) {
      e.preventDefault();
      this.submitted.emit(this.term);
   }
}
