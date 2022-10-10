import { Component } from '@angular/core';
import { WikipediaService } from './wikipedia.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent {
   constructor(private wikiService: WikipediaService) {}

   onTerm(term: string) {
      const results = this.wikiService.search(term);
      console.log(results);
   }
}

// https://www.mediawiki.org/wiki/API:Main_page

// https://www.mediawiki.org/wiki/API:Search#GET_request

// api.php?action=query&list=search&srsearch=Nelson%20Mandela&utf8=&format=json
