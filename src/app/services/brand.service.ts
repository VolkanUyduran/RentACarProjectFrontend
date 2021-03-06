import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleresponsemodel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44338/api/brands/";
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  add(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }
  getBrandId(brandId:number):Observable<SingleResponseModel<Brand>>{
    let newPath=this.apiUrl+"getbybrandid?brandId="+brandId;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath)
  }
  update(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }

  
}
