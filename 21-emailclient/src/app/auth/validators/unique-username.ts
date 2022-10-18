import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' }) // para poder ocupar inyeccion con httpclient
export class UniqueUsername implements AsyncValidator {
   constructor(private http: HttpClient) {}

   validate = (control: FormControl): Promise<any> | Observable<any> => {
      const { value } = control;
      console.log(value);

      return this.http
         .post<any>('https://api.angular-email.com/auth/username', {
            username: value,
         })
         .pipe(
            map((value) => {
               // nombre disponible responde : {available: true}
               if (value.available) {
                  return null;
               } else {
                  return { nameNotAvai: true };
               }
            }),
            // catchError DEBE devolver un observable, tengo q poner el catch error xq la API devuelve un error 422 cuando es nombre esta tomado
            catchError((err) => {
               // of crea un observable q emite lo q le ponga
               return of({ nonUniqueUsername: true });
            })
         );
   };
}
// la respuesta SI es q ya esta en uso es 422 ( error )
// el httpClient observable trata a las respuestas con status de error => cuando me respondan con un error en lugar de respuesta buena ( 200 o algo asi ), mi observable va a emitir un error
