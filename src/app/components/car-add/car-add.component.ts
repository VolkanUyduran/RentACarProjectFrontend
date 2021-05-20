import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  brands:Brand[];
  colors:Color[];
  carAddForm:FormGroup;
  constructor(private carService:CarService,private toastrService:ToastrService,private formBuilder:FormBuilder,
    private colorService:ColorService,private brandService:BrandService) { }

  ngOnInit(): void {
    this.createAddForm();
    this.getBrands();
    this.getColors();
  }
  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }
  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }
  createAddForm(){
    this.carAddForm=this.formBuilder.group({
      colorId:["",Validators.required],
      brandId:["",Validators.required],
      modelYear:["",Validators.required],
      description:["",Validators.required],
      carName:["",Validators.required],
      dailyPrice:["",Validators.required]
    })
  }
  add(){
    if(this.carAddForm.valid){
     let carModel=Object.assign({},this.carAddForm.value)
     this.carService.add(carModel).subscribe(response=>{
       
       this.toastrService.success(response.message,"Başarılı")
     },responseError=>{
      console.log(responseError)
       if(responseError.error.Errors!=null){
         for(let i=0;i<responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage)
          }
       }
     })
    }
    else{
      this.toastrService.error("Dikkat Araç eklenemedi","Formunuz eksik")
    }
  }
}
