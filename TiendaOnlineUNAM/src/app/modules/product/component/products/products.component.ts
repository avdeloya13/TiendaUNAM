import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { DtoProductList } from '../../_dto/dto-product-list';
import { ProductService } from '../../_service/product.service';
import { Router } from '@angular/router';
import { SwalMessages } from '../../../../shared/swal-messages';
import { ProductImageService } from '../../_service/product-image.service';
import { Product } from '../../_model/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products: Product[] = [];
  product: Product = new Product();
  swal: SwalMessages = new SwalMessages();
  productImgs: any[] = [];
  
  constructor(
    private productService: ProductService,
    private productimageService: ProductImageService,
    private router: Router
  ){ }

  ngOnInit(){
    this.getActiveProducts();
  }

  getActiveProducts(){
    this.productService.getActiveProducts().subscribe({
      next: (v) => {
        this.products = v;
        console.log(v);
      },
      //complete:()=>{ 
      //  for(let prod of this.products){
      //    this.getProductImages(prod.product_id);
      //}},
      error: (e) => {
        console.log(e);
        this.swal.errorMessage("No se pudo obtener los productos.");
      }
    });
  }

  //getProductImages(id: number) {
  //  this.productimageService.getProductImage(id).subscribe({
  //    next: (v) => {
  //      console.log(v);
  //      this.productImgs = v;
  //    },
  //    error: (e) => {
  //      this.swal.errorMessage("No hay imágenes");
  //      console.log(e);
  //    } 
  //  });
  //}

  getProductImages(product_id: number): any {
    this.productimageService.getProductImage(product_id).subscribe({
      next: (v) => {
        //console.log(v);
        return v[0];
      },
      error: (e) => {
        this.swal.errorMessage("No hay imágenes");
      } 
    });
  }

  showProduct(gtin: string){
    this.router.navigate(['product/' + gtin]);
  }

}
