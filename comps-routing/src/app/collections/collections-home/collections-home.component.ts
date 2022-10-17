import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-collections-home',
   templateUrl: './collections-home.component.html',
   styleUrls: ['./collections-home.component.css'],
})
export class CollectionsHomeComponent implements OnInit {
   data: { [key: string]: string | number }[] = [
      { name: 'James', age: 24, job: 'Designer', employed: 'si' },
      { name: 'Jill', age: 26, job: 'Engineer', employed: 'no' },
      { age: 25, name: 'Elyse', job: 'Engineer', employed: 'si' },
   ];

   headers: { [key: string]: string }[] = [
      { key: 'employed', label: 'Esta contratado' },
      { key: 'name', label: 'Name' },
      { label: 'Age', key: 'age' },
      { key: 'job', label: 'Job' },
   ];

   constructor() {}

   ngOnInit(): void {}
}

// { [key: string]: string; }
