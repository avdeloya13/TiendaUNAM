import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../_service/product.service';
import { CategoryService } from '../../_service/category.service';
import { Product } from '../../_model/product';
import { SharedModule } from '../../../../shared/shared-module';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalMessages } from '../../../../shared/swal-messages';

declare var $: any;

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent implements OnInit {
  product: Product = new Product();
  gtin: string | null = null;
  swal: SwalMessages = new SwalMessages();
  productImgs: any[] = [];
  categories: any[] = []; 
  form: FormGroup;
  submitted = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      gtin: ['', Validators.required],
      product: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      category_id: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
    this.gtin = this.route.snapshot.paramMap.get('gtin');
    if (this.gtin) {
      this.getProduct();
      this.getProductImages();
      this.loadCategories();
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (e) => {
        this.swal.errorMessage(e.error.message!);
      }
    });
  }

  getProduct() {
    this.productService.getProduct(this.gtin!).subscribe({
      next: (v) => {
        this.product = v;
        this.populateForm();
      },
      error: (e) => {
        this.swal.errorMessage(e.error.message!);
      }
    });
  }

  populateForm() {
    this.form.patchValue({
      gtin: this.product.gtin,
      product: this.product.product,
      price: this.product.price,
      stock: this.product.stock,
      category_id: this.product.category_id,
      description: this.product.description
    });
  }

  getProductImages() {
    this.productService.getProductImages(this.gtin!).subscribe({
      next: (response) => {
        this.productImgs = response.images;
      },
      error: (e) => {
        this.swal.errorMessage(e.error.message!);
      }
    });
  }

  fileChangeHandler(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadProductImage(file);
    }
  }

  uploadProductImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    this.productService.uploadProductImage(this.gtin!, formData).subscribe({
      next: (response) => {
        this.swal.successMessage("Imagen subida con éxito!");
        this.getProductImages();
      },
      error: (e) => {
        this.swal.errorMessage(e.error.message!);
      }
    });
  }

  deleteProductImage(imageId: number) {
    this.productService.deleteProductImage(imageId).subscribe({
      next: (response) => {
        this.swal.successMessage("Imagen eliminada con éxito!");
        this.getProductImages();
      },
      error: (e) => {
        this.swal.errorMessage(e.error.message!);
      }
    });
  }

  updateProduct() {
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    this.productService.updateProduct(this.form.value, this.product.product_id).subscribe({
      next: (v) => {
        this.swal.successMessage("Producto actualizado con éxito!");
        //this.router.navigate(['/product']); 
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message);
      }
    });
  }

  onSubmit() {
    this.updateProduct();
  }

  redirect(url: string[]) {
    this.router.navigate(url);
  }

  showModalForm(){
    $("#modalForm").modal("show");
    this.form.reset();
    this.submitted = false;
  }
}
