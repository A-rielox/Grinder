import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';

@Component({
   selector: 'app-email-show',
   templateUrl: './email-show.component.html',
   styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
   // email!: Email;
   email: Email = { id: '', subject: '', text: '', to: '', from: '', html: '' };

   // 🟡🟡 voy a ocupar un resolver p'q no carge el component hasta q tenga el email ( con EmailResolverService en inbox-routing )

   constructor(private route: ActivatedRoute) {
      // LA INFO DEL RESOLVER
      this.route.data.subscribe((data) => (this.email = data['email']));
      // {email: {…}} --> el data object
      // en "email" xq en el inbox-routing "resolve: { email: EmailResolverService },"
      //
      // la misma info en el snapshot
      // this.route.snapshot.data.email
      // si se regenara el mismo componente con otra data, no se genera la info actualizada en el snapshot, xeso es mejor con el observable
   }

   ngOnInit() {
      // OBTENGO LA INFO DEL EMAIL DEL RESOLVER
      // this.route.params.subscribe((value) => {
      //    // console.log(value); {id: 'bb39d82e0b94a5bf'}
      //    const { id } = value;
      //    this.emailId = id;
      //    this.emailService.getEmail(id).subscribe((res) => {
      //       console.log(res);
      //    });
      // });
      // la ventaja de switchMap es que si se manda otro req, antes de q el anterior se complete => cancela en anterior
      // q seria el caso en q el usuario se ponga a clickear todos los links de email y tenga una conexion lenta
      // this.route.params
      //    .pipe(
      //       switchMap(({ id }) => {
      //          return this.emailService.getEmail(id);
      //       })
      //    )
      //    .subscribe((email) => {
      //       this.email = email;
      //    });
   }
}
