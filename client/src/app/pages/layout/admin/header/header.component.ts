import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  locationActive: boolean = false;
  dishActive: boolean = false;
  constructor(
    private router: Router,
  ) {
  }
  onLocation() {
    this.locationActive = true;
    this.dishActive = false;
    this.router.navigate(['base/admin/post-location']);
  }
  onDish() {
    this.locationActive = false;
    this.dishActive = true;
    this.router.navigate(['base/admin/post-dish']);
  }
}
