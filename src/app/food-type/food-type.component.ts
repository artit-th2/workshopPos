import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import config from '../../config';
import { MyModalComponent } from "../my-modal/my-modal.component";

@Component({
  selector: 'app-food-type',
  standalone: true,
  imports: [FormsModule, MyModalComponent],
  templateUrl: './food-type.component.html',
  styleUrl: './food-type.component.css'
})
export class FoodTypeComponent {
  name: string = '';
  remark: string = '';
  foodTypes: any = [];
  id: number = 0;

  constructor(private http: HttpClient) { }

  clearForm() {
    this.name = '';
    this.remark = '';
    this.id = 0;
  }
  save() {
    try{
      const payload = {
        name: this.name,
        remark: this.remark,
        id : 0,
        
      };

      if (this.id > 0) {
        payload.id = this.id;
        this.http
        .put(config.apiServer + '/api/foodType/update', payload)
        .subscribe((res : any) => {
          this.fetchData();
          this.id = 0;
        });
      } else {
      this.http
      .post(config.apiServer + '/api/foodType/create', payload)
      .subscribe((res) => {
          this.fetchData();
          Swal.fire({
            title: 'สร้างประเภทอาหาร',
            text: 'เพิ่มประเภทอาหารสําเร็จ',
            icon: 'success',
          })
        });
      }
      document.getElementById('modalFoodType_btnClose')?.click();
    }catch(e: any){
      Swal.fire({
        title: 'สร้างประเภทอาหาร',
        text: 'เพิ่มประเภทอาหารไม่สําเร็จ'+ e.message,
        icon: 'error',
      })
    }
  }

  ngOnInit() {
    this.fetchData();
  };
  
  fetchData() {
    this.http
    .get(config.apiServer + '/api/foodType/list')
    .subscribe((res: any) => {
      this.foodTypes = res.results;
    });
  }
  async remove(item: any) {
    try {
      const button = await Swal.fire({
        title: 'ลบประเภทอาหาร',
        text: 'ต้องการลบประเภทอาหารใช่หรือไม่',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ใช่, ฉันต้องการลบ',
        cancelButtonText: 'ยกเลิก',
      });

      if (button.isConfirmed) {
        this.http
        .delete(config.apiServer + '/api/foodType/remove/' + item.id)
        .subscribe((res : any) => {
          this.fetchData();
        })
    }
  } catch (e: any) {
    Swal.fire({
      title: 'ลบประเภทอาหาร',
      text: 'ลบประเภทอาหารไม่สําเร็จ'+ e.message,
      icon: 'error',
    })
  }
}

  edit(item: any) {
    this.id = item.id;
    this.name = item.name;
    this.remark = item.remark;
  }


};