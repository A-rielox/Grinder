import { Component } from '@angular/core';
import { WikipediaService } from './wikipedia.service';

interface PagesType {
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
   pages: PagesType[] = [];

   constructor(private wikiService: WikipediaService) {}

   // si no lo pongo como " : any " tengo q poner la interfaz y el tipo en los lados donde llega esta info
   onTerm(term: string) {
      this.wikiService.search(term).subscribe((pages) => {
         this.pages = pages;
      });
   }
}
