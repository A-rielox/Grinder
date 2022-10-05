import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTimes]',
})
export class TimesDirective {
  @Input('appTimes') set render(times: number) {
    this.vcRef.clear();
    for (let i = 0; i < times; i++) {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}

// ViewContainerRef es la referencia al elemento al q le aplico este microship
// TemplateRef es la referencia a los elementos q estan dentro del vcRef
