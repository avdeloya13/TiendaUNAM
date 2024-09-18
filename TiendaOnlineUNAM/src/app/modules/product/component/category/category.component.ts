import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//Variable Global
declare var $: any;

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  
  form: FormGroup;
  categories: Category[] = [];

  submitted = false;

  constructor(private categoryService:CategoryService, private formBuilder: FormBuilder){ 
    //Formulario
    this.form = this.formBuilder.group({
    category: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });
  }

  ngOnInit():void{
    this.getCategories();
  }

  getCategories():void{
    this.categories = this.categoryService.getCategories();
  }

  //Para el formulario de nueva categoria
  showModalForm(){
    $("#modalForm").modal("show");
  }


}
