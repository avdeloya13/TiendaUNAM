import { Injectable } from '@angular/core';
import { Category } from '../_model/category';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private source = "/category";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source);
  }

  //Consume el endpoint post /category
  createCategory(category: any): Observable<any>{
    return this.http.post(api_dwb_uri + this.source, category);
  }

  //Consume el endpoint get /category/{id}
  getCategory(id:number): Observable<any>{
    return this.http.get(api_dwb_uri + this.source + "/" + id);
  }

  //Consume el endpoint put /category/{id}
  updateCategory(category: any, id: number): Observable<any>{
    return this.http.put(api_dwb_uri + this.source + "/" + id, category);
  } 

  //Consume el endpoint delete /category/{id}
  deleteCategory(id: number): Observable<any>{
    return this.http.delete(api_dwb_uri + this.source + "/" + id);
  }

  //Consume el endpoint put /category/{id}/activate
  activateCategory(id: number): Observable<any>{
    return this.http.put(api_dwb_uri + this.source + "/" + id + "/activate", null);
  }

  //Consume el endpoint get /category/active
  getActiveCategories(): Observable<any>{
    return this.http.get(api_dwb_uri + this.source + "/active");
  }
}
