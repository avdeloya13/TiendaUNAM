import { Component } from '@angular/core';
import { CartService } from '../../_service/cart.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { SharedModule } from '../../../../shared/shared-module';
import { InvoiceService } from '../../_service/invoice.service';

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
    private cartService: CartService,
    private invoiceService: InvoiceService
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

  getCostoTotal(){
    this.costo_total = 0;
    for (let prod of this.cartProducts){
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

  deleteCart(){
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la eliminación",
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.deleteCart().subscribe({
          next: (v) => {
            this.swal.successMessage("El carrito ha sido vaciado.");
            this.getCartProducts();
          },
          error: (e) => {
            this.swal.errorMessage("No se pudo vaciar el carrito.");
          }
        });
      }
    }); 
  }

  removeFromCart(id: number){
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la eliminación",
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(id).subscribe({
          next: (v) => {
            this.swal.successMessage("El producto ha sido eliminado.");
            this.getCartProducts();
          },
          error: (e) => {
            this.swal.errorMessage("No se pudo eliminar el producto.");
          }
        });
      }
    });
  }

  generateInvoice(id: any){
    this.invoiceService.generateInvoice(id).subscribe({
      next: (v) => {
        this.swal.successMessage("Compra realizada!");
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage("No se pudo realizar la compra.");
      }
    });
  }


}
