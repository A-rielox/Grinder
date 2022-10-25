import {
   Component,
   ElementRef,
   EventEmitter,
   OnInit,
   Output,
} from '@angular/core';
// lo llamo en HomeComponent de inbox/home/
@Component({
   selector: 'app-modal',
   templateUrl: './modal.component.html',
   styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
   @Output() dismiss = new EventEmitter();

   // ElementRef para tener acceso al componente en el q se renderiza en modal
   constructor(private el: ElementRef) {}

   ngOnInit(): void {
      //para q se renderice como direct child del body, p'q no vaya a haber nada de css q cascade down q me lo distorcione
      document.body.appendChild(this.el.nativeElement);
   }

   ngOnDestroy() {
      this.el.nativeElement.remove();
   }

   onDismissClick() {
      this.dismiss.emit();
   }
}
