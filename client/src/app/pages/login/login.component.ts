import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareModule } from '../../shared/shared.module';
import { TaigaModule } from '../../shared/taiga.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor (private router: Router) {}

  registerclick() {
    this.router.navigate(['/register']);
  }
}

