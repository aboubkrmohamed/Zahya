import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../all-product/product.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetailsComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  product:any;

  selectedImage!: string;

  quantity = 1;

get totalPrice(){

  return this.product?.price * this.quantity;
}
  ngOnInit(){
    const id =
    Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  loadProduct(id:number){
    const products =
    this.productService.getAll();
    this.product =
    products.find(p => p.id === id);
    if(this.product){
      this.selectedImage =
      this.product.image;
    }
  }


  changeImage(img:string){

    this.selectedImage = img;

  }

  increase(){
    this.quantity++;
  }

  decrease(){
    if(this.quantity > 1){

      this.quantity--;
    }

  }
}
