import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  
  categories: Category[] = [];

  constructor(private categoryService:CategoryService){ }

  ngOnInit():void{
    this.getCategories();
  }

  getCategories():void{
    this.categories = this.categoryService.getCategories();
  }
}
