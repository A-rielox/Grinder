import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from './email';

interface EmailSummary {
   id: string;
   subject: string;
   from: string;
}

@Injectable({
   providedIn: 'root',
})
export class EmailService {
   rootUrl = 'https://api.angular-email.com';

   constructor(private http: HttpClient) {}

   getEmails() {
      return this.http.get<EmailSummary[]>(this.rootUrl + '/emails');
      // el ,{  withCredentials: true } me lo pone el interceptor
   }

   getEmail(id: string) {
      return this.http.get<Email>(this.rootUrl + '/emails/' + id);
   }

   sendEmail(email: Email) {
      return this.http.post(this.rootUrl + '/emails', email);
   }
}

/* 
mandar a 
arielo@angular-email.com

lista de correos en 
GET   https://api.angular-email.com/emails

UN correo
GET   https://api.angular-email.com/emails/:id
*/
