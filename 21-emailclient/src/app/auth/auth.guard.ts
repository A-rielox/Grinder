import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, skipWhile, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
   providedIn: 'root',
})
export class AuthGuard implements CanLoad {
   constructor(private authService: AuthService, private router: Router) {}

   canLoad(
      route: Route,
      segments: UrlSegment[]
   ): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.signedin$.pipe(
         skipWhile((val) => val == null),
         take(1),
         tap((authenticated) => {
            console.log(authenticated);
            if (!authenticated) {
               this.router.navigateByUrl('/');
            }
         })
      );
   }
}

// se se le pasa un observable => se necesita q se complete para tomar su valor
// take() "marca" como completo el observable ( no lo marca, pero hace creer al subscriber que si )
