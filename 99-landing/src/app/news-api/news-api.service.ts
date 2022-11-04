import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
   filter,
   map,
   mergeMap,
   share,
   switchMap,
   take,
   tap,
   toArray,
} from 'rxjs/operators';

export interface Article {
   title: string;
   // description: string;
   url: string;
}

interface NewsApiResponse {
   totalResults: number;
   articles: Article[];
}

@Injectable({
   providedIn: 'root',
})
export class NewsApiService {
   private url = 'https://newsapi.org/v2/top-headlines';
   private pageSize = 10;
   private apiKey = 'b0639f0fe8874a6ab39e256f4dec5d18';
   private country = 'mx';

   // yellow 🟡 al ponerle un .pipe() a un Subject => se transform en Observable
   private pagesInput: Subject<number>; // num de la pag q quiero
   pagesOutput: Observable<Article[]>; // lista de articulos
   numberOfPages: Subject<number>; // p' mis nums de paginacion

   constructor(private http: HttpClient) {
      this.numberOfPages = new Subject();

      this.pagesInput = new Subject();

      this.pagesOutput = this.pagesInput.pipe(
         map((page) => {
            return new HttpParams()
               .set('apiKey', this.apiKey)
               .set('country', this.country)
               .set('pageSize', String(this.pageSize))
               .set('page', String(page));
         }),
         switchMap((params) => {
            return this.http.get<NewsApiResponse>(this.url, { params });
         }),
         tap((res) => {
            console.log(res);

            const totalPages = Math.ceil(res.totalResults / this.pageSize);

            this.numberOfPages.next(totalPages);
         }),
         map((res) => res?.articles)
      );
   }

   getPage(page: number) {
      this.pagesInput.next(page);
   }
}

/* 

GET https://newsapi.org/v2/top-headlines?country=mx&apiKey=b0639f0fe8874a6ab39e256f4dec5d18

------
category
The category you want to get headlines for. Possible options: business entertainment general health science sports technology. Note: you can't mix this param with the sources param.

?category=entertainment

-------


pageSize
int
The number of results to return per page (request). 20 is the default, 100 is the maximum.

page
int
Use this to page through the results if the total results found is greater than the page size.


-------------------

Response object
status
string
If the request was successful or not. Options: ok, error. In the case of error a code and message property will be populated.

totalResults
int
The total number of results available for your request.

articles
array[article]
The results of the request.

title
string
The headline or title of the article.

description
string
A description or snippet from the article.

url
string
The direct URL to the article.

urlToImage
string
The URL to a relevant image for the article.

publishedAt
string
The date and time that the article was published, in UTC (+000)

content
string
The unformatted content of the article, where available. This is truncated to 200 chars.

*/
