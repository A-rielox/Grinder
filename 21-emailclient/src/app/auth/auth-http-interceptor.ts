import {
   HttpEvent,
   HttpEventType,
   HttpHandler,
   HttpInterceptor,
   HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
   intercept(
      req: HttpRequest<any>,
      next: HttpHandler
   ): Observable<HttpEvent<any>> {
      // Aqui modifico o logeo la request saliente
      const modifiedReq = req.clone({
         withCredentials: true,
      });

      // Aqui veo o modifico la response ( o el status de la req )
      return next.handle(modifiedReq) /* .pipe(
         tap((event) => {
            if (event.type === HttpEventType.Sent) {
               console.log('Request sent to server');
            }

            if (event.type === HttpEventType.Response) {
               console.log('Response arrived, body data: ');
               console.log(event.body);
            }
         })
      ) */;
   }
}

/*  PARA PODER OCUPAR EL INTERCEPTOR, SE EJECUTAN EN EL ORDEN Q LOS PONGO ACA

   providers: [
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthHttpInterceptor,
         multi: true,
      },
*/

/*  EL DE MAXITO

export class AuthHttpInterceptor implements HttpInterceptor {
   intercept(req: HttpRequest<any>, next: HttpHandler) {
      const modifiedRequest = req.clone({
         headers: req.headers.append('Auth', 'XDXDXD'),
      });

      return next.handle(modifiedRequest);
   }
}

*/
