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

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(){
    this.getCartProducts();
  }

  getCartProducts() {
    this.cartService.getCart().subscribe({
      next: (v) => {
        this.cartProducts = v;
        console.log(v);
      },
      error: (e) => {
        this.swal.errorMessage("No hay productos en el carrito.");
      } 
    });
  }
}
