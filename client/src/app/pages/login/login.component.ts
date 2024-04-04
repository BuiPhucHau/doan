import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareModule } from '../../shared/shared.module';
import { TaigaModule } from '../../shared/taiga.module';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthState } from '../../ngrx/state/auth.state';
import { UserState } from '../../ngrx/state/user.state';
import { UserFirebase } from '../../models/userFirebase.model';
import { onAuthStateChanged } from '@firebase/auth';
import * as UserActions from '../../ngrx/actions/user.actions';
import { User } from '../../models/user.model';
import { FormControl, FormGroup } from '@angular/forms';
import * as AuthActions from '../../ngrx/actions/auth.actions';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  isLoginWithGoogle = false;
  user$ = this.store.select('user', 'user');
  userFirebase: UserFirebase = <UserFirebase>{};
  userFirebase$ = this.store.select('auth', 'userFirebase');
  isGetSuccessUser = false;

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user && user.email) {
        this.isLoginWithGoogle = true;
        this.userFirebase = {
          uid: user.uid,
          email: user.email || '',
          name: user.displayName || '',
          picture: user.photoURL || '',
        };
        this.store.dispatch(UserActions.getByEmail({ email: user.email || "" }));
      }
    });

    this.user$.subscribe((user) => {
      if (user && user.email) {
        this.isGetSuccessUser = true;
        console.log('isGetSuccessUser: ' + this.isGetSuccessUser);

        if (this.accountData.password != '' && this.accountData.email != '') {
          console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
          if (user.password == this.accountData.password) {
            const userAsJsoBth = JSON.stringify(user);
            sessionStorage.setItem('user', userAsJsoBth);
            console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
            this.router.navigate(['/base/home']);
            this.isGetSuccessUser = false;
            console.log('login w account');
            this.accountData = {
              email: '',
              password: '',
            };
          }
        } else {
          if (this.isLoginWithGoogle && this.userFirebase.email == user.email) {

            console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
            const userAsJsonGG = JSON.stringify(user);
            sessionStorage.setItem('user', userAsJsonGG);

            this.router.navigate(['/base/home']);
            console.log('login w gg');
            this.isGetSuccessUser = false;
          }
        }
      } else if (this.isGetSuccessUser && user && user.email == "404 user not found" && this.isLoginWithGoogle) {

        console.log(this.userFirebase);
        this.router.navigate(['/register']);

      }
    });
  }

  accountForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  accountData = {
    email: '',
    password: '',
  };

  loginWithAccount() {
    this.accountData = {
      email: this.accountForm.value.email || '',
      password: this.accountForm.value.password || '',
    };
    this.store.dispatch(
      UserActions.getByEmail({ email: this.accountData.email })
    );
    console.log(UserActions.getByEmail);
  }

  loginWithGoogle() {
    this.isLoginWithGoogle = true;
    this.store.dispatch(AuthActions.login());
  }


  registerclick() {
    this.isLoginWithGoogle = false;
    this.router.navigate(['/register']);
  }
}
