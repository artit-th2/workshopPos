import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-my-modal',
  standalone: true,
  imports: [],
  templateUrl: './my-modal.component.html',
  styleUrl: './my-modal.component.css'
})
export class MyModalComponent {
  @Input() modalID: string = '';
  @Input() title: string = '';

}
