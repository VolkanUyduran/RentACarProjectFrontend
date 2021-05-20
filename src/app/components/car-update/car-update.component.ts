import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarModel } from 'src/app/models/carModel';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  brands: Brand[];
  colors: Color[];
  carUpdateForm: FormGroup;
  car: CarModel;
  dataLoaded = false;

  constructor(private carService: CarService, private brandService: BrandService,
    private colorService: ColorService, private toastrService: ToastrService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getById(params["carId"]);
        this.createCarUpdateForm();

      }

    })
    this.getColors();
    this.getBrands();
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
  getById(carId: number) {
    this.carService.getCarById(carId).subscribe(response => {
      this.dataLoaded = true;
      this.car = response.data
      this.setValueUpdateForm();
    })
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      colorId: [""],
      brandId: [""],
      description: [""],
      modelYear: [""],
      dailyPrice: [""],
      carName: [""]
    })
  }
  setValueUpdateForm() {
    this.carUpdateForm.setValue({
      colorId: [this.car.colorId],
      brandId: [this.car.brandId],
      description: [this.car.description],
      modelYear: [this.car.modelYear],
      dailyPrice: [this.car.dailyPrice],
      carName: [this.car.carName]
    })
  }
  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value)
      carModel.id = this.car.id
      this.carService.update(carModel).subscribe(response => {
        this.toastrService.success("Güncellendi", "müqmüq")
      }, responseError => {
        console.log(responseError)
        if (responseError.error.Errors != null) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage)
          }
        }
      })
    }
    else {
      this.toastrService.error("Form Güncellenemedi")
    }
  }
}
