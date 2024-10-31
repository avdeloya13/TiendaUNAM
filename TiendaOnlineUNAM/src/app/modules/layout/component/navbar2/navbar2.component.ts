import { Component } from '@angular/core';
import { Category } from '../../../product/_model/category';
import { CategoryService } from '../../../product/_service/category.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { SharedModule } from '../../../../shared/shared-module';
import { AuthenticationService } from '../../../auth/_service/authentication.service';
import { LoginComponent } from '../../../auth/component/login/login.component';
import { RegisterComponent } from '../../../auth/component/register/register.component';

declare var $: any;

@Component({
  selector: 'app-navbar2',
  standalone: true,
  imports: [SharedModule, LoginComponent, RegisterComponent],
  templateUrl: './navbar2.component.html',
  styleUrl: './navbar2.component.css'
})
export class Navbar2Component {

  categories: Category[] = [];

  swal: SwalMessages = new SwalMessages(); 

  loggedIn = false;

  isAdmin = false;

  constructor(
    private categoryService: CategoryService,
    private servicioAutenticacion: AuthenticationService
  ){}

  getCategories(){
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  ngOnInit(){
    if(localStorage.getItem("token")){
      this.loggedIn = true;
    }

    if(localStorage.getItem("user")){
      let user = JSON.parse(localStorage.getItem("user")!);
      if(user.rol == "ADMIN"){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
    }

    this.getCategories();
  }

  logout(){
    this.servicioAutenticacion.logOut();
    this.loggedIn = false;
    window.location.reload();
  }

  showLoginModal(){
    $("#loginModal").modal("show");
  }

  showRegisterModal(){
    $("#registerModal").modal("show");
  }


}
