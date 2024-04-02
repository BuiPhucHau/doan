import { Component } from '@angular/core';
import { ShareModule } from '../../../shared/shared.module';
import { TaigaModule } from '../../../shared/taiga.module';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {

}
