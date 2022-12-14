import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
   {
      // lazy-loading
      path: 'elements',
      loadChildren: () =>
         import('./elements/elements.module').then((m) => m.ElementsModule),
   },
   {
      path: 'collections',
      loadChildren: () =>
         import('./collections/collections.module').then(
            (m) => m.CollectionsModule
         ),
   },
   {
      path: 'views',
      loadChildren: () =>
         import('./views/views.module').then((m) => m.ViewsModule),
   },
   {
      path: 'mods',
      loadChildren: () =>
         import('./mods/mods.module').then((m) => m.ModsModule),
   },
   { path: '', component: HomeComponent },
   {
      path: '**',
      component: NotFoundComponent,
   },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}

/*  RECORDAR EN EL IMPORTS (en app.module) TENGO Q PONER EL "AppRoutingModule" al final , x el orden en q busca las rutas, para que no calze primero el " path: '**' "

   imports: [  
      BrowserModule,
      ElementsModule,
      CollectionsModule,
      AppRoutingModule,
   ],
*/

/*  SIN LAZY-LOADING

const routes: Routes = [
   { path: '', component: HomeComponent },
   {
      path: '**',
      component: NotFoundComponent,
   },
];

*/
