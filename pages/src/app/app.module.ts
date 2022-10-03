import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClassDirective1 } from './class1.directive';
import { ClassDirective } from './class.directive';
import { TimesDirective } from './times.directive';

@NgModule({
  declarations: [AppComponent, ClassDirective1, ClassDirective, TimesDirective],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
