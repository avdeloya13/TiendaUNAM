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
import { CartService } from '../../../invoice/_service/cart.service';
import { Cart } from '../../../invoice/_model/cart';

declare var $: any;

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './by-cat-product-image.component.html',
  styleUrls: ['./by-cat-product-image.component.css']
})
export class ByCatProductImageComponent {

  product: Product = new Product();
  gtin: string | null = null;
  swal: SwalMessages = new SwalMessages();
  productImgs: any[] = [];
  categories: any[] = []; 
  form: FormGroup;
  submitted = false;
  isAdmin = false;
  loggedIn = false;
  categoria: number = 0;
  cantidad_productos: number = 1; 

  constructor(
    private productService: ProductService,
    private productimageService: ProductImageService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngxService: NgxPhotoEditorService,
    private cartService: CartService
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
    if(localStorage.getItem("token")){
      this.loggedIn = true;
    }

    this.gtin = this.route.snapshot.paramMap.get('gtin');
    if (this.gtin) {
      this.getProduct();
      this.getProductImages();
      this.loadCategories();
    }

    if(localStorage.getItem("user")){
      let user = JSON.parse(localStorage.getItem("user")!);
      if(user.rol == "ADMIN"){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
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
        console.log(v);
        this.categoria = v.category_id;
        if(this.product.stock < 1){
          this.swal.infoMessage("Producto agotado.");
        }
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

  showCategoriesby(id: number) {
    this.router.navigate(['categoria', id]);
  }

  incrementQuantity() {
    if (this.cantidad_productos < this.product.stock) { 
      this.cantidad_productos++;
    }
  }

  decrementQuantity() {
    if (this.cantidad_productos > 1) { 
      this.cantidad_productos--;
    }
  }

  updateProductStock(gtin: string, stock: number){
    this.productService.updateProductStock(this.product.gtin, this.product.stock).subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        console.error(e);
      }
    });
  }
  
  addToCart(gtin: string, quantity: number) {
    let cart:Cart = new Cart();
    cart.gtin = gtin;
    cart.quantity = quantity;

    this.cartService.addToCart(cart).subscribe({
      next: (v) => {
        this.swal.successMessage("Producto agregado al carrito!");
        console.log(cart);
        this.updateProductStock(gtin, quantity);
      },
      error: (e) => {
        console.log(e);
        if(this.loggedIn == false){
          this.swal.errorMessage("Inicia sesión para agregar productos al carrito.");
        }
        if(this.loggedIn == true){
          this.swal.errorMessage("No hay suficiente stock.");
        }  
      }
    });
  }
}
