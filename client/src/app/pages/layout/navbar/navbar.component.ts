import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShareModule } from '../../../shared/shared.module';
import { TaigaModule } from '../../../shared/taiga.module';
import { User } from '../../../models/user.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/state/auth.state';
import { UserState } from '../../../ngrx/state/user.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../../../ngrx/actions/auth.actions';
import * as UserAction from '../../../ngrx/actions/user.actions';
import * as UserActions from '../../../ngrx/actions/user.actions';
import { combineLatest } from 'rxjs';

interface Page {
  id: number;
  name: string;
  link: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  pageSelected: number = 0;
  url = '';
  pages: Page[] = [
    { id: 0, name: 'Menu', link: 'base/menu' },
    { id: 1, name: 'Booking', link: 'base/booking' },
    { id: 2, name: 'Location', link: 'base/location' },
    { id: 3, name: 'News', link: 'base/new' },
    { id: 4, name: 'Order', link: 'base/order' },
    { id: 5, name: 'Admin', link: 'base/admin' },
  ];
  user: User = <User>{};
  route$ = this.router.events;
  user$ = this.store.select('user', 'user');
  auth$ = this.store.select('auth', 'isLogoutSuccess');

  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    uid: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private store: Store<{ auth: AuthState; user: UserState }>) {

    this.user$.subscribe((user) => {
      if (user && user._id != null && user._id != undefined) {
        console.log(user);
        this.user = user;
      } else {
        this.user = { _id: '', uid: '', avatar: '', email: '', name: '', role: '', password: '', phone: '', address: '' };
      }
    });

    this.store.select('user').subscribe((user) => {
      if (user != null && user != undefined) {
        this.userForm.controls.avatar.setValue(user.user.avatar);
        this.userForm.controls.email.setValue(user.user.email);
        this.userForm.controls.name.setValue(user.user.name);
        this.userForm.controls.uid.setValue(user.user.uid);
      }
      
    });

    this.auth$.subscribe((res) => {
      if (res) {
        console.log(res);
        sessionStorage.clear();
        this.router.navigate(['/login']);
        this.store.dispatch(AuthActions.resetState());
        this.store.dispatch(UserAction.resetUser());
      }
    });

  //   combineLatest({
  //     route: this.route$,
  //     user: this.user$,
  //   }).subscribe((res) => {
  //     if (res.user && res.user.role != 'admin') {
  //       console.log(res.user.role);
  //       console.log(this.pages.length);
  //       if (this.pages.length == 7) {
  //         this.pages.splice(6, 1);
  //         this.pages[this.pages.length - 1].id = this.pages.length - 1;
  //       }
  //     }
  //     if (this.router.url != this.url) {
  //       this.url = this.router.url;
  //       this.router.url === '/base/home' ? (this.pageSelected = 0) : null;
  //       this.router.url === '/base/menu' ? (this.pageSelected = 1) : null;
  //       this.router.url === '/base/booking' ? (this.pageSelected = 2) : null;
  //       this.router.url === '/base/location' ? (this.pageSelected = 3) : null;
  //       this.router.url === '/base/order' ? (this.pageSelected = 4) : null;
  //       this.router.url === '/base/new' ? (this.pageSelected = 5) : null;
  //     }else {
  //       if (this.router.url != this.url) {
  //         this.url = this.router.url;
  //       this.router.url === '/base/home' ? (this.pageSelected = 0) : null;
  //       this.router.url === '/base/menu' ? (this.pageSelected = 1) : null;
  //       this.router.url === '/base/booking' ? (this.pageSelected = 2) : null;
  //       this.router.url === '/base/location' ? (this.pageSelected = 3) : null;
  //       this.router.url === '/base/order' ? (this.pageSelected = 4) : null;
  //       this.router.url === '/base/new' ? (this.pageSelected = 5) : null;
  //       this.router.url === '/base/admin' ? (this.pageSelected = 6) : null;
  //       }
  //     }
  //   });
  // }
  combineLatest({
    route: this.route$,
    user: this.user$,
  }).subscribe((res) => {
    if (res.user && res.user.role != 'admin') {
      console.log(res.user.role);
      console.log(this.pages.length);
      if (this.pages.length === 6) {
        this.pages.splice(5, 1);
      }
    } else if (res.user && res.user.role === 'admin') {
      const adminPage = { id: 5, name: 'Admin', link: 'base/admin' };
      if (!this.pages.find(page => page.id === adminPage.id)) {
        this.pages.push(adminPage);
      }
    }
  
    if (this.router.url != this.url) {
      this.url = this.router.url;
      switch (this.router.url) {
        case '/base/home':
          this.pageSelected = 0;
          break;
        case '/base/menu':
          this.pageSelected = 1;
          break;
        case '/base/booking':
          this.pageSelected = 2;
          break;
        case '/base/location':
          this.pageSelected = 3;
          break;
        case '/base/order':
          this.pageSelected = 4;
          break;
        case '/base/new':
          this.pageSelected = 5;
          break;
        case '/base/admin':
          this.pageSelected = 6;
          break;
        default:
          break;
      }
    }
  });}
  selected(index: number) {
    console.log('navigate success')
    this.router.navigate([this.pages[index].link]);
  }

  home() {
    this.router.navigate(['base/home']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
