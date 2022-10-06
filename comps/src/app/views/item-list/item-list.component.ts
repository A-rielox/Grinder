import { Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'app-item-list',
   templateUrl: './item-list.component.html',
   styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
   @Input() items: { image: string; title: string; description: string }[] = [];
   constructor() {}

   ngOnInit(): void {}
}

/*  LIFE CYCLE HOOKS

constructor() {
   console.log(items)     --> []
}

ngOnInit(): void {
   console.log(items)     --> [{...} , {...}]
}

ngOnChanges() {

}

el el ctor todavia no tengo acceso a las pros o lo q se pase de los parent

ngOnInit --> cuando recien se muestra el componente en la pantalla y se han pasado las props de los padres hacia aca

ngOnChanges --> se llama cada que se pasa una prop de un parent y cada q una prop cambia

*/
