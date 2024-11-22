import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { ProductService } from '../../_service/product.service';
import { Router } from '@angular/router';
import { SwalMessages } from '../../../../shared/swal-messages';
import { CategoryService } from '../../_service/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  swal: SwalMessages = new SwalMessages();
  productImgs: any[] = [];
  categories: any = [];
  products_categories: any =[];
  
  constructor(
    private productService: ProductService,
    private categoryService:CategoryService,
    private router: Router
  ){ }

  ngOnInit(){
    this.getProductsFromActiveCategories();
  }

  //Cuando se obtienen los productos por categorias, estos vienen con la direccion de la imagen, cosa que no pasa
  //si solo los obtienes con alguna función del servicio de productos.
  //Por lo que mi idea fue obtener las categorias activas y de ahí obtener los productos de cada categoría.

  getProductsByCategory(category_id: number) {
    this.productService.getProductsByCategory(category_id).subscribe({
      next: (v) => {
        //Almacena los productos en products_categories y los ordena por su product_id
        this.products_categories = [...this.products_categories, ...v].sort((a, b) => a.product_id - b.product_id);
      },
      error: (e) => {
        this.swal.errorMessage("No se pudo obtener los productos.");
      },
    });
  }

  getProductsFromActiveCategories() {
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v;
        
        if (this.categories && this.categories.length) {
          this.categories.forEach((category: any) => {
            this.getProductsByCategory(category.category_id);
          });
        } else {
          this.swal.errorMessage("No hay categorías activas disponibles.");
        }

      },
      error: (e) => {
        this.swal.errorMessage("No se pudo obtener las categorías activas.");
      },
    });
  }

  showProducts(gtin: string) {
    this.router.navigate(['products', 'product', gtin]);
    }

}
