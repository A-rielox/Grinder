import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // p' las forms
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardFormComponent } from './card-form/card-form.component';
import { InputComponent } from './input/input.component';
import { CardComponent } from './card/card.component';

// import { NgxMaskModule, IConfig } from 'ngx-mask';

// export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
   declarations: [AppComponent, CardFormComponent, InputComponent, CardComponent],
   imports: [
      BrowserModule,
      ReactiveFormsModule /* , NgxMaskModule.forRoot() */,
   ],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
