import {
   Component,
   OnInit,
   ElementRef,
   OnDestroy,
   Output,
   EventEmitter,
} from '@angular/core';

//
//          TENGO Q RENDERIZARLO EN EL BODY
//

// ElementRef me da acceso al host de este componente con ElementRef.nativeElement

@Component({
   selector: 'app-modal',
   templateUrl: './modal.component.html',
   styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
   @Output() close = new EventEmitter();

   constructor(private el: ElementRef) {
      // console.log(el.nativeElement);    --> <app-modal>...
   }

   ngOnInit(): void {
      document.body.appendChild(this.el.nativeElement);
   }

   ngOnDestroy(): void {
      this.el.nativeElement.remove();
   }

   onCloseClick() {
      this.close.emit();
   }
}
