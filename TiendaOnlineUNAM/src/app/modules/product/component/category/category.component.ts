import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared-module';
import { SwalMessages } from '../../../../shared/swal-messages';

//Variable Global
declare var $: any;

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  
  form: FormGroup;
  categories: any = [];

  submitted = false;
  categoryUpdate: number = 0;

  swal: SwalMessages = new SwalMessages();

  current_date = new Date();

  constructor(private categoryService:CategoryService, private formBuilder: FormBuilder){ 
    //Formulario
    this.form = this.formBuilder.group({
    category: ["", [Validators.required]],
    tag: ["", [Validators.required]],
  });
  }

  ngOnInit():void{
    this.getCategories();
  }

  enableCategory(id: number){
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la activación",
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.enableCategory(id).subscribe({
          next: (v) => {
            this.swal.sucessMessage("La categoría ha sido activada");
            this.getCategories();
          },
          error: (e) => {
            this.swal.errorMessage("No se pudo activar la categoría");
          }
        });
      }
    });
  }

  disableCategory(id: number){
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la eliminación",
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.disableCategory(id).subscribe({
          next: (v) => {
            this.swal.sucessMessage("La categoría ha sido eliminada");
            this.getCategories();
          },
          error: (e) => {
            this.swal.errorMessage("No se pudo eliminar la categoría");
          }
        });
      }
    }); 
  }

  getCategories(){
    this.categoryService.getCategories().subscribe({
      next: (v) => {
        this.categories = v;
        this.current_date = new Date();
      },
      error: (e) => {
        this.swal.errorMessage("No hay un listado de categorias");
      } 
    });
  }

  onSubmit():void{
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    if(this.categoryUpdate == 0){
      this.onSubmitCreate();
    } else {
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate(){
    this.categoryService.createCategory(this.form.value).subscribe({
      next: (v) => {
        this.swal.sucessMessage("La categoría ha sido creada");
        this.getCategories();
        this.hideModalForm();
      },
      error: (e) => {
        this.swal.errorMessage("No se pudo crear la categoría");
      }  
    });
  }

  onSubmitUpdate(){
    this.categoryService.updateCategory(this.form.value, this.categoryUpdate).subscribe({
      next: (v) => {
        this.getCategories();
        this.hideModalForm();
     
        this.categoryUpdate = 0;
        this.swal.sucessMessage("La categoría ha sido actualizada");
      },
      error: (e) => {
        this.swal.errorMessage("No se pudo actualizar la categoría");
      }
    });
  }

  updateCategory(category: Category){
    this.showModalForm();
    
    this.categoryUpdate = category.category_id;

    this.form.reset();
    this.submitted = false;

    this.form.controls['category'].setValue(category.category);
    this.form.controls['tag'].setValue(category.tag);

    $("#modalForm").modal("show"); 
  }

  //Para el formulario de nueva categoria
  showModalForm(){
    this.submitted = false;
    this.form.reset();
    $("#modalForm").modal("show");
  }

  hideModalForm(){
    $("#modalForm").modal("hide");
  }

}
