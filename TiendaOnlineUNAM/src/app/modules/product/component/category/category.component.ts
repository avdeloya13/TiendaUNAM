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
    this.categories = this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe({
      next: (v) => {
        this.categories = v;
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

    this.onSubmitCreate();

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

  UpdateCategory(Category: Category){
    this.categoryUpdate = Category.category_id;

    this.form.reset();
    this.form.controls['category'].setValue(Category.category);
    this.form.controls['tag'].setValue(Category.tag);

    this.submitted = false;
    $("#modalForm").modal("show"); 
  }


  onSubmitUpdate(){
    this.categoryService.updateCategory(this.form.value, this.categoryUpdate).subscribe({
      next: (v) => {
        this.swal.sucessMessage("La categoría ha sido actualizada");
        this.getCategories();
        this.hideModalForm();
        this.categoryUpdate = 0;
      },
      error: (e) => {
        this.swal.errorMessage("No se pudo actualizar la categoría");
      }  
    });
  }

  enableCategory(id:number){
    this.categoryService.activateCategory(id).subscribe({
      next: (v) => {
        this.swal.sucessMessage("La categoría ha sido activada");
        this.getCategories(); //para actualizar las categorias
      },
      error: (e) => {
        this.swal.errorMessage("No se pudo activar la categoría");
      }  
    });
  }

  disableCategory(id:number){
    this.categoryService.deleteCategory(id).subscribe({
      next: (v) => {
        this.swal.sucessMessage("La categoría ha sido eliminada");
        this.getCategories(); //para actualizar las categorias
      },
      error: (e) => {
        this.swal.errorMessage("No se pudo eliminar la categoría");
      }  
    });
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
