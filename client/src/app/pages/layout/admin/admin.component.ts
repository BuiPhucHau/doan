import { Component } from '@angular/core';
import { ShareModule } from '../../../shared/shared.module';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ ShareModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
