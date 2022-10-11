import { Component } from '@angular/core';
import { WikipediaService } from './wikipedia.service';

interface pagesType {
   title: string;
   snippet: string;
   pageid: number;
   wordcount: number;
}

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent {
   pages: pagesType[] = [];

   constructor(private wikiService: WikipediaService) {}

   onTerm(term: string) {
      this.wikiService.search(term).subscribe((pages) => {
         this.pages = pages;
      });
   }
}

// https://www.mediawiki.org/wiki/API:Main_page

// https://www.mediawiki.org/wiki/API:Search#GET_request

// api.php?action=query&list=search&srsearch=Nelson%20Mandela&utf8=&format=json

/*

                  LO Q DEVUELVE EL SEARCH


const xdf = {
   batchcomplete: '',
   continue: { sroffset: 10, continue: '-||' },
   query: {
      searchinfo: {
         totalhits: 362339,
         suggestion: 'since',
         suggestionsnippet: 'since',
      },
      search: [
         {
            ns: 0,
            title: 'Space',
            pageid: 27667,
            size: 34678,
            wordcount: 4279,
            snippet:
               '<span class="searchmatch">Space</span> is the boundless three-dimensional extent in which objects and events have relative position and direction. In classical physics, physical space',
            timestamp: '2022-10-05T15:42:49Z',
         },
         {...}
      ],
   },
};
 */
