import { Component, Input, OnInit } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
   selector: 'app-email-reply',
   templateUrl: './email-reply.component.html',
   styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent implements OnInit {
   @Input() email!: Email;

   showModal: boolean = false;

   constructor(private emailService: EmailService) {}

   ngOnInit(): void {}

   onSubmit(e: Email) {
      this.emailService.sendEmail(e).subscribe(() => {
         this.showModal = false;
      });
   }

   ngOnChanges() {
      let { to, from, text, subject } = this.email;

      text = text.replace(/\n/gi, '\n> ');

      this.email = {
         ...this.email,
         from: to,
         to: from,
         subject: `RE: ${subject}`,
         text: `\n\n\n------------ ${from} wrote:\n> ${text}`,
      };

      // MI COSECHA
      if (!this.email.text) {
         this.email = {
            ...this.email,
            text: this.email.html,
         };
      }
   }
}
