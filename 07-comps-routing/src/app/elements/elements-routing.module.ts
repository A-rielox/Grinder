import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementsHomeComponent } from './elements-home/elements-home.component';

// 🍋
const routes: Routes = [{ path: '', component: ElementsHomeComponent }];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class ElementsRoutingModule {}

/*  PREVIO LAZY-LOADING

const routes: Routes = [{ path: 'elements', component: ElementsHomeComponent }];

*/

// 🍋 al agregar lazy-loading la ruta aqui es relativa a la q pongo donde cargo el lazy-loading ( en app-routing la cargue con " import('./elements/elements.module') " x eso al ponerla aca como " path: ' ' " accedo a ella como /elements, que es la que ya esta cargada en app-routing )
/* EL PATH EN APP-ROUTING

{
   // lazy-loading
   path: 'elements',
   loadChildren: () =>
      import('./elements/elements.module').then((m) => m.ElementsModule),
},


*/
