import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ByCategoryService {

  private source = "/categoria";

  constructor(private http: HttpClient) { }
  
  getProductsByCategory(category_id: number): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/category/" + category_id);
  }

}
