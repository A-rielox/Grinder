import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface PhotoType {
   urls: {
      regular: string;
   };
}

@Injectable({
   providedIn: 'root',
})
export class PhotosService {
   url: string = 'https://api.unsplash.com/photos/random';

   constructor(private http: HttpClient) {}

   getPhoto() {
      return this.http
         .get<PhotoType>(this.url, {
            headers: {
               Authorization:
                  'Client-ID 9FJqpj__l-JxUnG4I8DW7tvntTendzSC70yvE-iNTrY',
            },
         })
         .pipe(map((res) => res.urls.regular));
   }
}

/* 
https://api.unsplash.com/
GET /photos/random

Access Key
9FJqpj__l-JxUnG4I8DW7tvntTendzSC70yvE-iNTrY

Secret key
0hGy236zXIiyPrsU2HD4r_2k7fJrC3-CrOIestWtXJE


{
   ...,
   "urls": {
   "raw": "https://im.......aac51acc9e5d",
   "full": "https://im.......aac51acc9e5d?q=75&fm=jpg",
   "regular": "https://im.......aac51a&w=1080&fit=max",
   "small": "https://im.......aac51pg&w=400&fit=max",
   "thumb": "https://im.......aac51acg&w=200&fit=max"
      },
}

*/
