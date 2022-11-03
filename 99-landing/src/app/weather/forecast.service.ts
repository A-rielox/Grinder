import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
   filter,
   map,
   mergeMap,
   share,
   switchMap,
   tap,
   toArray,
} from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationsService } from '../notifications/notifications.service';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

interface OpenWeatherResponse {
   list: {
      dt_txt: string;
      main: {
         temp: number;
      };
   }[];
}

@Injectable({
   providedIn: 'root',
})
export class ForecastService {
   private url = 'https://api.openweathermap.org/data/2.5/forecast';

   constructor(
      private http: HttpClient,
      private notificationsService: NotificationsService
   ) {}

   getForecast() {
      return this.getCurrentLocation().pipe(
         map((coords) => {
            return new HttpParams()
               .set('lat', String(coords.latitude))
               .set('lon', String(coords.longitude))
               .set('units', 'metric')
               .set('appid', 'ca8b5facabb63bd9ace383475dbcabc4');
         }),
         switchMap((params) =>
            this.http.get<OpenWeatherResponse>(this.url, { params })
         ),
         map((res) => res?.list),
         mergeMap((value) => of(...value)),
         filter((value, index) => index % 8 === 0),
         map((value) => {
            return { dateString: value.dt_txt, temp: value.main.temp };
         }),
         // recolecta los datos y cuando el observable se marca como completo => los emite como un array
         toArray(),
         // yellow 🟡 P' Q AL TENER VARIAS SUBSCRIPCIONES A ESTE OBSERVABLE NO ME CORRA TODO OTRA VEZ X C/UNO 🟡 yellow
         share()
      );
   }

   getCurrentLocation() {
      return new Observable<GeolocationCoordinates>((observer) => {
         window.navigator.geolocation.getCurrentPosition(
            (position) => {
               observer.next(position.coords);
               observer.complete();
            },
            (err) => observer.error(err)
            // me pone el Observable en err state y ya no pedo emitir valores y pasa el valor a la fcn de error
         );
      }).pipe(
         tap(() => {
            this.notificationsService.addSuccess('Got your location. 👍');
         }),
         catchError((err) => {
            this.notificationsService.addError(
               'Failed to get your location. 💩'
            );

            // en catchError SIEMPRE hay q retornar un observable
            return throwError(err);
         })
      );
   }
}

/*       switchMap()

OperatorFunction<T, ObservedValueOf<O> | R>: A function that returns an Observable that emits the result of applying the projection function (and the optional deprecated resultSelector) to each item emitted by the source Observable and taking only the values from the most recently projected inner Observable.

SIMPLEMENTE RETORNA OTRO OBSERVABLE SOBRE EL Q SEGUIR CONSTRUYENDO   

      mergeMap()
      produce un observable nuevo xc/ valor q le llegue

      switchMap()
      emite un observable nuevo pero BORRA el anterior
*/

/* API KEY
ca8b5facabb63bd9ace383475dbcabc4

- Example of API call:

api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

*/
