import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' }) // para poder ocupar inyeccion, ya q al ocupar injeccion entonces este va a tener acceso a httpClient aca
export class UniqueUsername implements AsyncValidator {
   constructor(private authService: AuthService) {}

   // la fnc esta escrita como arrow fcn xq como la llama angular al querer validar => me descalabra el " this. "
   validate = (control: FormControl): Promise<any> | Observable<any> => {
      const { value } = control;

      return this.authService.usernameAvailable(value).pipe(
         map((value) => {
            // nombre disponible responde : {available: true}
            if (value.available) {
               return null;
            } else {
               return { nameNotAvai: true };
            }
         }),
         // 🟡 yellow catchError DEBE devolver un observable, tengo q poner el catch error xq la API devuelve un error 422 cuando es nombre esta tomado
         catchError((err) => {
            // of crea un observable q emite lo q le ponga
            return of({ nonUniqueUsername: true });

            // x si falla xq no hay coneccion, seria =>
            // if(err.error.username){
            //    return of({ nonUniqueUsername: true });

            // }else {
            //    return of({ noConnection: true });

            // }
         })
      );
   };
}

// 🟡 yellow
// para agarrar los errores q vengan de requests ( los 400's y 500's ) tengo q agarrarlos con catchError, ya q el observable ( el post o get o lo q sea ) NO me los tira por el next, sino como errores

// la respuesta SI es q ya esta en uso es 422 ( error )
// el httpClient observable trata a las respuestas con status de error => cuando me respondan con un error en lugar de respuesta buena ( 200 o algo asi ), mi observable va a emitir un error

/*  al poner tipo  "FormControl"  ( en lugar de AbstractControl )  en 

         validate(control: FormControl):
   
   debo usar  "as AsyncValidatorFn" en 

         [this.uniqueUsername.validate as AsyncValidatorFn]

   o aca usar "validate(control: AbstractControl)"
*/
