import { Component } from '@angular/core';
import { CartService } from '../../_service/cart.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { SharedModule } from '../../../../shared/shared-module';

declare var $: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  swal: SwalMessages = new SwalMessages();
  cartProducts: any[] = [];
  costo_total: number = 0;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(){
    this.getCartProducts();
  }

  getCostoProducto(gtin: string): number{
    for (let prod of this.cartProducts){
      if (gtin === prod.product.gtin){
        return prod.quantity * prod.product.price;
      }
    }
    return 0; 
  }

  getCostoTotal() {
    for (let prod of this.cartProducts) {
      this.costo_total += prod.quantity * prod.product.price;
    }
  }

  getCartProducts() {
    this.cartService.getCart().subscribe({
      next: (v) => {
        this.cartProducts = v;
        this.getCostoTotal();
        console.log(v);
      },
      error: (e) => {
        this.swal.errorMessage("No hay productos en el carrito.");
      } 
    });
  }


}
