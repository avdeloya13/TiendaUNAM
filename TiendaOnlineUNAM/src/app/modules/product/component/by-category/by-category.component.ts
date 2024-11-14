import { Component } from '@angular/core';
import { SwalMessages } from '../../../../shared/swal-messages';
import { ProductService } from '../../_service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../../shared/shared-module';
import { CategoryService } from '../../_service/category.service';

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
  category: any = '';

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private router: Router){ }

  ngOnInit():void{
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.getProductsbyCategory();
        this.getCategory();
      }
    });
  }

  getProductsbyCategory(){
    this.productService.getProductsByCategory(this.id).subscribe({
      next: (v) => {
        this.product_category = v;
        console.log(v);
      },
      error: (e) => {
        this.swal.errorMessage("No hay productos en la categoría");
      } 
    });
  }

  showProduct(gtin: string) {
    this.router.navigate(['product', gtin]);
  }

  getCategory(){
    this.categoryService.getCategory(this.id).subscribe({
      next: (v) => {
        this.category = v;
      },
      error: (e) => {
        this.swal.errorMessage("No se pudo obtener la categoría.");
      } 
    });
  }
}
