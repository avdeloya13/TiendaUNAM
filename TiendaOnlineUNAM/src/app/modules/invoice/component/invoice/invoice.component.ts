import { Component } from '@angular/core';
import { DtoInvoiceList } from '../../_dto/dto-invoice-list';
import { SwalMessages } from '../../../../shared/swal-messages';
import { InvoiceService } from '../../_service/invoice.service';
import { SharedModule } from '../../../../shared/shared-module';
import { Router } from '@angular/router';
import { CartService } from '../../_service/cart.service';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {

  invoices: DtoInvoiceList[] = []; // Invoice list

  current_date = new Date(); // hora y fecha actual
  loading = false; // loading request 
  swal: SwalMessages = new SwalMessages(); // swal messages

  cart: any =[];

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private cartService: CartService
  ){}

  ngOnInit(){
    this.getInvoices();
    this.addToCart();
  }

  getInvoices(){
    this.loading = true;
    this.invoiceService.getInvoices().subscribe({
      next: (v) => {
        this.invoices = v;
        this.loading = false;
        this.current_date = new Date();
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      }
    });
  }

  addToCart(){
    this.cartService.addToCart(this.cart).subscribe({
      next: (v) => {
        this.cart = v;
        console.log(v);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage("No se pudo agregar al carrito");
      }
    });
  }

  showInvoice(id: number){
    this.router.navigate(['invoice/' + id]);
  }
}
