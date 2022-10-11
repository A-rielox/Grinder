import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, pluck } from 'rxjs';

// en las interfaces q ocupo puedo poner SOLO las props que me interesan y el resto omitirlas 🍅🍅
// el search q es array de objects --> search : {} []
interface WikipediaResponse {
   query: {
      search: {
         title: string;
         snippet: string;
         pageid: number;
         wordcount: number;
      }[];
   };
}

@Injectable({
   providedIn: 'root',
})
export class WikipediaService {
   url: string = 'https://en.wikipedia.org/w/api.php';

   constructor(private http: HttpClient) {}

   search(term: string) {
      return this.http
         .get<WikipediaResponse>(this.url, {
            params: {
               action: 'query',
               format: 'json',
               list: 'search',
               utf8: '1',
               srsearch: term,
               origin: '*', // px el req no se hace escribiendo el url directo en el browser
            },
         })
         .pipe(
            map((res) => res?.query?.search)
            // pluck('query', 'search')
         );
   }
}
/* 
https://en.wikipedia.org/w/api.php?
action=query&
format=json&
list=search&
utf8=1&
srsearch=space
*/

/*          🍅🍅

                  LO Q DEVUELVE EL SEARCH


{
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
