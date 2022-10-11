import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../photos.service';

@Component({
   selector: 'app-photo-show',
   templateUrl: './photo-show.component.html',
   styleUrls: ['./photo-show.component.css'],
})
export class PhotoShowComponent implements OnInit {
   image: string = '';

   constructor(private photoService: PhotosService) {}

   ngOnInit(): void {
      this.fetchImage();
   }

   onClick() {
      this.fetchImage();
   }

   fetchImage() {
      this.photoService.getPhoto().subscribe((regUrl) => {
         this.image = regUrl;
      });
   }
}
