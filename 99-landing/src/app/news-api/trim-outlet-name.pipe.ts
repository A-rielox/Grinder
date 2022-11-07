import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'trimOutletName',
})
export class TrimOutletNamePipe implements PipeTransform {
   transform(title: string, outletName: string): unknown {
      // console.log(outletName);

      // return title.replace(` - ${outletName}`, '');
      return title.slice(0, title.indexOf(' - '));
   }
}

// el valor de " article.title " entra como el title: string
// y lo q retorno es lo q se muestra en pantalla
//
// <a
//       *ngFor="let article of articles"
//       class="list-group-item list-group-item-action"
//       [href]="article.url"
//       target="_blank"
//    >
//       {{ article.title | trimOutletName }}
// </a>
