import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared-module';
import { DtoProductList } from '../../_dto/dto-product-list';
import { CategoryService } from '../../_service/category.service';
import { ProductService } from '../../_service/product.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { Category } from '../../_model/category';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  
  products: DtoProductList[] = [];

  categories: Category[] = [];

  form: FormGroup;
  
  current_date = new Date();
  loading = false;
  submitted = false;
  swal: SwalMessages = new SwalMessages();

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
  ){
    this.form = this.formBuilder.group({
      product: ["", [Validators.required]],
      gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      description: ["", [Validators.required]],
      price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      category_id: [0, [Validators.required]],
    });
  
  }

  ngOnInit(){
    this.getProducts();
  }

  disableProduct(id: number){
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la eliminación",
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.disableProduct(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message);
            this.getProducts();
          },
          error: (e) => {
            console.log(e);
            this.swal.errorMessage(e.error.message);
          }
        });
      }
    });
  }

  enableProduct(id: number){
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la activación",
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.enableProduct(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message);
            this.getProducts();
          },
          error: (e) => {
            console.log(e);
            this.swal.errorMessage(e.error.message);
          }
        });
      }
    });
  }

  getProducts(){
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (v) => {
        this.products = v;
        this.loading = false;
        this.current_date = new Date();
      },
      error: (e) => {
        this.loading = false;
        console.log(e);
        this.swal.errorMessage(e.error!.message);
      }
    });
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    this.productService.createProduct(this.form.value).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message);
        this.getProducts();
        this.hideModalForm();
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message);
      }
    });
  }

  showModalForm(){
    $("#modalForm").modal("show");
    this.getActiveCategories();
    this.form.reset();
    this.submitted = false;
  }

  hideModalForm(){
    $("#modalForm").modal("hide");
  }

  getActiveCategories(){
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message);
      }
    });
  }

  showProduct(gtin: string){
    this.router.navigate(['product/' + gtin]);
  }

}