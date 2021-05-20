import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/car-image';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[]
  carImages: CarImage[] = [];
  dataLoaded = false;
  defaultImage = "/images/defaultImage.png"
  url = "https://localhost:44338"
  filterText: string = "";
  brands: Brand[];
  colors: Color[];
  brandId: number;
  colorId: number;

  constructor(private carService: CarService, private carImageService: CarimageService,
    private activatedRoute: ActivatedRoute, private colorService: ColorService, private brandService: BrandService) { }

  ngOnInit(): void {
    //this.getCars();
    this.activatedRoute.params.subscribe(params => {
      if (params['brandId'] && params['colorId']) {
        this.getCarsBrandIdAndColorId(params['brandId'], params['colorId'])
        console.log("çalıstı")
      }
      else if (params['brandId']) {
        this.getCarsByBrandId(params['brandId'])
      }
      else if (params['colorId']) {
        this.getCarsByColorId(params['colorId'])
      }
      else {
        this.getCars();
      }
    }
    )
    this.getBrands();
    this.getColors();

  }

  getCars() {
    this.carService.getCarDetails().subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true;
      console.log(response.data)
    })

  }
  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;

    })
  }
  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe(response => {
      this.cars = response.data;
      console.log(response);
      this.dataLoaded = true;
    })
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
  getCarsBrandIdAndColorId(brandId: number, colorId: number) {
    this.carService.getCarBrandIdAndColorId(brandId, colorId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
      console.log(response.data)
    })
  }



}
