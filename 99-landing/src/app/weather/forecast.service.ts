import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, pluck, switchMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

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

   constructor(private http: HttpClient) {}

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
         mergeMap((value) => of(...value))
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
      });
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
