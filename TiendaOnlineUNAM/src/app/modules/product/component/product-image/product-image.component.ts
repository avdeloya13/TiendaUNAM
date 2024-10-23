import { Component } from '@angular/core';
import { ProductService } from '../../_service/product.service';
import { Product } from '../../_model/product';
import { SharedModule } from '../../../../shared/shared-module';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalMessages } from '../../../../shared/swal-messages';

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-image.component.html',
  styleUrl: './product-image.component.css'
})
export class ProductImageComponent {

  //Variables globales
  product: Product = new Product();
  gtin: any;
  swal: SwalMessages = new SwalMessages();

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute, 
    private router: Router){}

  ngOnInit(){
    this.gtin = this.route.snapshot.paramMap.get('gtin');
    if(this.gtin){
      this.getProduct();
    }
  }

  getProduct(){
    this.productService.getProduct(this.gtin).subscribe({
      next: (v) => {
        this.product = v;
        //this.getProductImages(this.product.product_id);
      },
      error: (e) => {
        this.swal.errorMessage(e.error.message!);
      }
    });
  }


  redirect(url:string[]){

  }
 
}
