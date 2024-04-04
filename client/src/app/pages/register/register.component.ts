import { Component } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../ngrx/state/auth.state';
import { UserState } from '../../ngrx/state/user.state';
import { UserFirebase } from '../../models/userFirebase.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../../ngrx/actions/auth.actions';
import * as UserActions from '../../ngrx/actions/user.actions';
import { User } from '../../models/user.model';
import { ShareModule } from '../../shared/shared.module';
import { TaigaModule } from '../../shared/taiga.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ShareModule, TaigaModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isLoginWithGoogle = false;
  userFirebase: UserFirebase = <UserFirebase>{};
  user$ = this.store.select('user', 'user');

  regisForm = new FormGroup({
    _id: new FormControl('', Validators.required),
    uid: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-zA-Z-0-9]+/g),
    ]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]+/g),
    ]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoginWithGoogle = true;
        this.userFirebase = {
          uid: user.uid,
          picture: user.photoURL || '',
          email: user.email || '',
          name: user.displayName || '',
        };
        this.store.dispatch(AuthActions.storageUserFirebase(this.userFirebase));
      }
    });
    this.store.select('user', 'isCreateSussess').subscribe((state) => {
      if (state) {
        this.router.navigate(['/base/home']);
      }
    });
  }

  registerclick() {
    if(this.isLoginWithGoogle) {
      let regisData: User = {
        _id: '',
        uid: this.userFirebase.uid ?? '',
        name: this.userFirebase.name,
        email: this.userFirebase.email,
        password: this.regisForm.value.password ?? '',
        phone: this.regisForm.value.phone ?? '',
        avatar: this.userFirebase.picture,
        address: this.regisForm.value.address ?? '',
        role: 'user',
      };
      this.store.dispatch(UserActions.createUser({user : regisData}));
      console.log(regisData);
      }
      else {
        let regisData: User = {
          _id: '',
          uid: this.regisForm.value.name ?? '',
          name: this.regisForm.value.name ?? '',
          email: this.regisForm.value.email ?? '',
          password: this.regisForm.value.password ?? '',
          phone: this.regisForm.value.phone ?? '',
          avatar: '',
          address: this.regisForm.value.address ?? '',
          role: 'user',
        };
        this.store.dispatch(UserActions.createUser({user : regisData}));
        }
      }

  loginclick() {
    this.router.navigate(['/login']);
  }
}
