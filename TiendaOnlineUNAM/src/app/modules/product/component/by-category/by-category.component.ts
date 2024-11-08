import { Component } from '@angular/core';
import { ByCategoryService } from '../../_service/by-category.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { ProductService } from '../../_service/product.service';
import { CategoryService } from '../../_service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../../shared/shared-module';

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

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService){ }

  ngOnInit():void{
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.getProductsbyCategory();
      }
    });
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
