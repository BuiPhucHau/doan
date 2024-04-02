import { Component } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {

}
