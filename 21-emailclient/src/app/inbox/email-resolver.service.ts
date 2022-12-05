import { Injectable } from '@angular/core';
import {
   ActivatedRouteSnapshot,
   Resolve,
   Router,
   RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Email } from './email';
import { EmailService } from './email.service';

@Injectable({
   providedIn: 'root',
})
export class EmailResolverService implements Resolve<Email> {
   // Resolve<Email> el tipo <Email> es p' especificar el tipo de data q se va a devolver del resolver
   constructor(private emailService: EmailService, private router: Router) {}

   resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Email | Observable<Email> | Promise<Email> {
      const { id } = route.params;

      return this.emailService.getEmail(id).pipe(
         catchError(() => {
            this.router.navigateByUrl('/inbox/not-found');

            //rxjs y typescript me piden devolver algo como observable, pero en realidad no lo necesito, xq al navegar hacia otro lado se cancela el resolver, => devuelvo el EMPTY ( q es un observable ya marcado como completed )
            return EMPTY;
         })
      );
   }
}
