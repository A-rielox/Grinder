import { Component } from '@angular/core';
import { WikipediaService } from './wikipedia.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent {
   pages = [];

   constructor(private wikiService: WikipediaService) {}

   onTerm(term: string) {
      this.wikiService.search(term).subscribe((res: any) => {
         this.pages = res.query.search;
      });
   }
}

// https://www.mediawiki.org/wiki/API:Main_page

// https://www.mediawiki.org/wiki/API:Search#GET_request

// api.php?action=query&list=search&srsearch=Nelson%20Mandela&utf8=&format=json
