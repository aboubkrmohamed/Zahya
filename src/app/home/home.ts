import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  oldPrice: number;
  price: number;
  rating: number;
  reviewsCount: number;

  isNew?: boolean;
  isHot?: boolean;
  discount?: number;

  outOfStock?: boolean;

  sizes?: string[];
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule,TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home{

  private translate = inject(TranslateService);

  products: Product[] = [
    {
      id: 1,
      category: 'RADIANCE',
      name: 'Brightening Serum Cream',
      image: 'assets/imgs/product-img-1.png',
      oldPrice: 200,
      price: 176,
      rating: 5,
      reviewsCount: 50,
      isNew: true,
      outOfStock: true,
    },

    {
      id: 2,
      category: 'RADIANT',
      name: 'Hydrating Red Lip Stain',
      image: 'assets/imgs/product-img-2.png',
      oldPrice: 200,
      price: 187,
      rating: 5,
      reviewsCount: 50,
      isNew: true,
    },

    {
      id: 3,
      category: 'CRYSTAL',
      name: 'Prism Eyeshadow Palette',
      image: 'assets/imgs/product-img-3.png',
      oldPrice: 200,
      price: 170,
      rating: 5,
      reviewsCount: 50,
      discount: 15,
    },

    {
      id: 4,
      category: 'CRYSTAL GLEAM',
      name: 'Crystal-Infused Highlighter',
      image: 'assets/imgs/product-img-4.png',
      oldPrice: 200,
      price: 150,
      rating: 5,
      reviewsCount: 50,
      isHot: true,
      discount: 15,
      sizes: [' 1500 ML', '1000 ML', ' 500 ML', '250 ML'],
    },

     {
      id: 4,
      category: 'CRYSTAL GLEAM',
      name: 'Crystal-Infused Highlighter',
      image: 'assets/imgs/product-img-5.png',
      oldPrice: 200,
      price: 150,
      rating: 5,
      reviewsCount: 50,
      isHot: true,
      discount: 15,
      sizes: [' 1500 ML', '1000 ML', ' 500 ML', '250 ML'],
    },

         {
      id: 4,
      category: 'CRYSTAL GLEAM',
      name: 'Crystal-Infused Highlighter',
      image: 'assets/imgs/product-img-6.png',
      oldPrice: 200,
      price: 150,
      rating: 5,
      reviewsCount: 50,
      isHot: true,
      discount: 15,
      sizes: [' 1500 ML', '1000 ML', ' 500 ML', '250 ML'],
    },

             {
      id: 4,
      category: 'CRYSTAL GLEAM',
      name: 'Crystal-Infused Highlighter',
      image: 'assets/imgs/product-img-7.png',
      oldPrice: 200,
      price: 150,
      rating: 5,
      reviewsCount: 50,
      isHot: true,
      discount: 15,
      sizes: [' 1500 ML', '1000 ML', ' 500 ML', '250 ML'],
    },

             {
      id: 4,
      category: 'CRYSTAL GLEAM',
      name: 'Crystal-Infused Highlighter',
      image: 'assets/imgs/product-img-8.png',
      oldPrice: 200,
      price: 150,
      rating: 5,
      reviewsCount: 50,
      isHot: true,
      discount: 15,
      sizes: [' 1500 ML', '1000 ML', ' 500 ML', '250 ML'],
    },
  ];
}
