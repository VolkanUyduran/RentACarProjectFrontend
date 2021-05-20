import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm: FormGroup;
  color: Color;
  dataLoaded = false;

  constructor(private colorService: ColorService, private toastrService: ToastrService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["colorId"]) {
        this.getById(params["colorId"])
        this.createUpdateForm();
      }
    })
  }
  createUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [""],
      colorName: [""]
    })
  }
  getById(colorId: number) {
    this.colorService.getColorId(colorId).subscribe(response => {
      this.color = response.data;
      this.dataLoaded = true;

    })
  }
  setValueUpdateForm() {
    this.colorUpdateForm.setValue({
      colorId: [this.color.colorId],
      colorName: [this.color.colorName]
    })
  }
  update() {
    if (this.colorUpdateForm.valid) {
      let color = Object.assign({}, this.colorUpdateForm.value)
      color.colorId = this.color.colorId;
      this.colorService.Update(color).subscribe(response => {
        this.toastrService.success("Renk Güncellendi", "Başarılı")
      }, responseError => {
        if (responseError.error.Errors != null) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error("Renk güncellenemedi", "Başarısız")
          }
        }
      })
    } else {
      this.toastrService.error("Formunuz Eksik")
    }
  }

}
