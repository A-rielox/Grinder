import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { CollectionsModule } from './collections/collections.module'; x lazy-loading
// import { ElementsModule } from './elements/elements.module'; x lazy-loading
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
   declarations: [AppComponent, HomeComponent, NotFoundComponent],
   imports: [
      BrowserModule,
      // ElementsModule,  x lazy-loading
      // CollectionsModule,  x lazy-loading
      AppRoutingModule,
   ],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
