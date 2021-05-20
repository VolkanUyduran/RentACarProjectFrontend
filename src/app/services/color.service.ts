import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleresponsemodel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl="https://localhost:44338/api/colors/";

  constructor(private httpClient:HttpClient ) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath)
  }
  add(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,color)
  }
  getColorId(colorId:number):Observable<SingleResponseModel<Color>>{
   let newPath=this.apiUrl+"getbycolorid?colorId="+colorId
   return this.httpClient.get<SingleResponseModel<Color>>(newPath) 
  }
  Update(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPath,color)
  }
}
