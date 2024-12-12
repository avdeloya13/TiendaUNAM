import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ByCategoryService {

  private source = "/categoria";

  constructor(private http: HttpClient) { }


}
