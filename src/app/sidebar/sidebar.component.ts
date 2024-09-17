import { Component } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  name: string = '';

  ngOnInit() {
    this.name = localStorage.getItem('angular_name')!;
  }

  logout() {
    Swal.fire({
      title: 'ต้องการออกจากระบบ',
      text: 'คุณต้องการออกจากระบบหรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('angular_token');
        localStorage.removeItem('angular_name');
        location.reload();
      }
    });
  }
}
