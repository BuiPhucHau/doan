import { Router } from '@angular/router';
import {ChangeDetectionStrategy, Component } from '@angular/core';
import { ShareModule } from '../../../shared/shared.module';
import { TaigaModule } from '../../../shared/taiga.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  selected: string = '';

  constructor(private router: Router) { }

  select(tabName: string) {
    this.selected = tabName;
    if (tabName == 'menu') {
    this.router.navigate(['base/menu']);
      
    }
    else if (tabName == 'booking') {
      this.router.navigate(['base/booking']);
    }
    else if (tabName == 'location') {
      this.router.navigate(['base/location']);
    }
    else if (tabName == 'order') {
      this.router.navigate(['base/order']);
    }
  }

  homeclick(){
    this.router.navigate(['base/home']);
  }
  
}
