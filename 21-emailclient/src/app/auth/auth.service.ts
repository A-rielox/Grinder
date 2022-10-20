import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface SignupCredentials {
   username: string;
   password: string;
   passwordConfirmation: string;
}

interface SignupResponse {
   username: string;
}

interface SignedinResponse {
   authenticated: boolean;
   username: string;
}

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   rootUrl = 'https://api.angular-email.com';
   signedin$ = new BehaviorSubject(false);

   constructor(private http: HttpClient) {}

   usernameAvailable(username: string) {
      return this.http.post<{ available: boolean }>(
         this.rootUrl + '/auth/username',
         {
            username: username,
         }
      );
   }

   // 🟡 ,{withCredentials: true} para q Angular no descarte las cookies y ahora las guarde y reenvie
   signup(credentials: SignupCredentials) {
      return (
         this.http
            .post<SignupResponse>(this.rootUrl + '/auth/signup', credentials)
            //si viene un error del http.post se salta el pipe q es lo q quiero
            .pipe(tap(() => this.signedin$.next(true)))
      );
   }

   // revisa si ya esta logeado
   checkAuth() {
      return this.http
         .get<SignedinResponse>(this.rootUrl + '/auth/signedin')
         .pipe(
            tap((res) => {
               console.log(res);

               this.signedin$.next(res.authenticated);
            })
         );
   }

   signout() {
      return this.http.post(this.rootUrl + '/auth/signout', {}).pipe(
         tap((res) => {
            console.log(res);
            this.signedin$.next(false);
         })
      );
   }
}

// yellow la razon de usar un subject ( q es un observable y observer ) es q puede emitir eventos desde fuera de el (con .next()) en cualquier momento.
// EXPLICACION EN VIDEO 7-8 DE CAP 22
// yellow con BehaviorSubject tengo acceso al ultimo valor emitido por el subject
