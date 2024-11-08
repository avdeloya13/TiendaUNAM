import { Component } from '@angular/core';
import { SwalMessages } from '../../../../shared/swal-messages';
import { ProductService } from '../../_service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../../shared/shared-module';
import { ProductImageService } from '../../_service/product-image.service';

@Component({
  selector: 'app-by-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './by-category.component.html',
  styleUrl: './by-category.component.css'
})
export class ByCategoryComponent {

  swal: SwalMessages = new SwalMessages();

  product_category: any =[];

  id: any = '';

  productImgs: any[] = [];

  constructor(private productService: ProductService,
              private productimageService: ProductImageService,
              private route: ActivatedRoute,
              private router: Router){ }

  ngOnInit():void{
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.getProductsbyCategory();
        this.getProductImage();
      }
    });
  }

  getProductImage(){
    this.productimageService.getProductImage(this.id).subscribe({
      next: (v) => {
        console.log("Imágenes de productos:", v);
        this.productImgs = v;
      },
      error: (e) => {
        this.swal.errorMessage(e.error.message!);
      }
    });
  }

  getProductImageById(productId: number): string {
    const productImages = this.productImgs.filter((img) => img.product_id === productId);
    return productImages.length > 0 ? productImages[0].image : 'assets/no-product-image.png';
  }

  getProductsbyCategory(){
    this.productService.getProductsByCategory(this.id).subscribe({
      next: (v) => {
        //this.product_category = this.productService.getProducts();
        this.product_category = v;
        console.log(v);
      },
      error: (e) => {
        this.swal.errorMessage("No hay productos en la categoría");
      } 
    });
  }

  redirect(url: string[]) {
    this.router.navigate(url);
  }

}
