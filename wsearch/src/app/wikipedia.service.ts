import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
   providedIn: 'root',
})
export class WikipediaService {
   url: string = 'https://en.wikipedia.org/w/api.php';

   constructor(private http: HttpClient) {}

   search(term: string) {
      return this.http.get(this.url, {
         params: {
            action: 'query',
            format: 'json',
            list: 'search',
            utf8: '1',
            srsearch: term,
            origin: '*', // px el req no se hace escribiendo el url directo en el browser
         },
      });
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
