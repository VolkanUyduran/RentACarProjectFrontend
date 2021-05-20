import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/car-image';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { RentalService } from 'src/app/services/rental.service';



@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
carImages:CarImage[];
imgUrl:string="https://localhost:44338/Images/"
car:Car;
dataLoaded=false;
url = "https://localhost:44338"
index=0
control:boolean;
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private carImageService:CarimageService,
    private rentalService:RentalService) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailByCarId(params['carId']);
        this.getImagesByCarId(params['carId'])
        this.CheckCar(params['carId'])
      }
    });
  }
    getImagesByCarId(carId:number){
      this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
        this.carImages=response.data;
        console.log(response.data)
        this.dataLoaded=true;
      }) 
    }
    getCarDetailByCarId(carId:number){
      this.carService.getCarDetailsById(carId).subscribe(response=>{
        this.car=response.data;
        this.dataLoaded=true;
      })
    }
    CheckCar(carId:number){
    this.rentalService.CheckCar(carId).subscribe(response=>{
      this.control=response.success;
    })
    }
}