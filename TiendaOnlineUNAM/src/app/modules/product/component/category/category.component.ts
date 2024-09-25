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
  categories: Category[] = [];

  submitted = false;

  swal: SwalMessages = new SwalMessages();

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

  onSubmit():void{
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    let id = this.categories.length + 1;
    let category = new Category(id, this.form.controls['category'].value!, this.form.controls['tag'].value!,1);
    this.categories.push(category);

    this.hideModalForm();

    this.swal.sucessMessage("La categoría ha sido registrada");
  }

  getCategories():void{
    this.categories = this.categoryService.getCategories();
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
