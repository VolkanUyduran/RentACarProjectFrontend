import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm: FormGroup;
  brand: Brand;
  dataLoaded = false;

  constructor(private brandService: BrandService, private toastrService: ToastrService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getById(params["brandId"])
        this.createUpdateForm();
      }
    })
  }
  createUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: [""],
      brandName: [""]
    })
  }

  getById(brandId: number) {
    this.brandService.getBrandId(brandId).subscribe(response => {
      this.brand = response.data;
      this.dataLoaded = true;
      this.setValueUpdateForm();
    })
  }
  setValueUpdateForm() {
    this.brandUpdateForm.setValue({
      brandId: [this.brand.brandId],
      brandName: [this.brand.brandName]
    })
  }
  update() {
    if (this.brandUpdateForm.valid) {
      let brand = Object.assign({}, this.brandUpdateForm.value)
      brand.brandId = this.brand.brandId
      this.brandService.update(brand).subscribe(response => {
        this.toastrService.success("marka güncellendi", "zupaaa")
      }, responseError => {
        if (responseError.error.Errors != null) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i])
          }
        }
      })
    }
    else {
      this.toastrService.error("Formunuz eksik")
    }
  }


}
