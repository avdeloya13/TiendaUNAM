import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../_service/product.service';
import { CategoryService } from '../../_service/category.service';
import { Product } from '../../_model/product';
import { SharedModule } from '../../../../shared/shared-module';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalMessages } from '../../../../shared/swal-messages';
import { ProductImageService } from '../../_service/product-image.service';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { ProductImage } from '../../_model/product-image';

declare var $: any;

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent {
  product: Product = new Product();
  gtin: string | null = null;
  swal: SwalMessages = new SwalMessages();
  productImgs: any[] = [];
  categories: any[] = []; 
  form: FormGroup;
  submitted = false;

  constructor(
    private productService: ProductService,
    private productimageService: ProductImageService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngxService: NgxPhotoEditorService
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
        this.getProductImages();
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
    this.productimageService.getProductImage(this.product.product_id).subscribe({
      next: (v) => {
        this.productImgs = v;
      },
      error: (e) => {
        this.swal.errorMessage("No hay imágenes");
      } 
    });
  }

  fileChangeHandler($event: any) {
    this.ngxService.open($event, {
      aspectRatio: 1 / 1,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      this.uploadProductImage(data.base64!);
    });
  }

  uploadProductImage(image: any){

    let productImage: ProductImage = new ProductImage();
    productImage.product_id = this.product.product_id;
    productImage.image = image;
 
    // enviamos la imagen a la API
    this.productimageService.uploadProductImage(productImage).subscribe({
      next: (v) => {
        this.swal.successMessage("Imagen subida con éxito!");
        this.getProduct();
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage("No se pudo subir la imagen.");
      }
    });
  }


  deleteProductImage(imageId: number) {
    this.productimageService.deleteProductImage(imageId).subscribe({
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
        this.getProduct();
        this.hideModalForm();
        this.swal.successMessage("Producto actualizado con éxito!");
        
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

  hideModalForm(){
    $("#modalForm").modal("hide");
    $('.modal-backdrop').remove();
  }
}
