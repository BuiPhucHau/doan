import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import * as AuthActions from './../../ngrx/actions/auth.actions';
import { Subscription } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy, OnInit {
  // Flags for different login methods
  isLoginWithGoogle = false;

  // Observables for user state
  user$ = this.store.select('user', 'user');
  userFirebase: UserFirebase = <UserFirebase>{};
  userFirebase$ = this.store.select('auth', 'userFirebase');

  // Flag for successful user retrieval
  isGetSuccessUser = false;
  errorMessage = '';

  // Form group for account login
  accountForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  // Account data object
  accountData = {
    email: '',
    password: '',
  };
  // Array to hold subscriptions for cleanup
  subcriptions: Subscription[] = [];
  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>,
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService
  ) {
    // Listen for authentication state changes
    onAuthStateChanged(this.auth, (user) => {
      console.log(user);
      if (user && user.email != undefined && user.email != '') {
        this.isLoginWithGoogle = true;
        this.userFirebase = {
          uid: user.uid,
          email: user.email || '',
          name: user.displayName || '',
          picture: user.photoURL || '',
        };
        this.store.dispatch(
          UserActions.getByEmail({ email: user.email || '' })
        );
      }
    });
  }
  // Lifecycle hook that runs after the component is initialized
  ngOnInit() {
    this.subcriptions.push(
      // Subscribe to user observable
      this.user$.subscribe((user) => {
        if (
          user != <User>{} &&
          user != undefined &&
          user != null &&
          user.email != undefined
        ) {
          this.isGetSuccessUser = true;

          if (
            this.accountData.password != '' &&
            this.accountData.email != '' &&
            !this.isLoginWithGoogle
          ) {
            if (
              user.password == this.accountData.password &&
              user.email == this.accountData.email
            ) {
              const userAsJson = JSON.stringify(user);
              sessionStorage.setItem('user', userAsJson);
              this.alerts
                .open('Login success.', { status: 'success' })
                .subscribe();
              this.router.navigate(['/base/home']);
              this.resetLoginState();
            } else {
              this.errorMessage = 'Email or password is incorrect.';
              this.resetLoginState();
            }
          } else {
            if (
              this.isLoginWithGoogle &&
              this.userFirebase.email == user.email
            ) {
              console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
              const userAsJsonGG = JSON.stringify(user);
              sessionStorage.setItem('user', userAsJsonGG);
              this.alerts
                .open('Login success.', { status: 'success' })
                .subscribe();
              this.router.navigate(['/base/home']);
              console.log('Login with google');
              this.isGetSuccessUser = false;
            }
          }
        }
        if (
          this.isGetSuccessUser && user.email == '404 user not found' && this.isLoginWithGoogle
        ) {
          this.alerts
            .open('You dont have an account yet, please register an account.', {
              status: 'error',
            })
            .subscribe();
            this.router.navigate(['/register']);
        }
      })
    );
  }
  // Lifecycle hook that runs when the component is destroyed
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subcriptions.forEach((sub) => sub.unsubscribe());
  }
  // Method to handle login with Account
  loginWithAccount() {
    this.accountData = {
      email: this.accountForm.value.email || '',
      password: this.accountForm.value.password || '',
    };
    this.store.dispatch(
      UserActions.getByEmailAndPassword({
        email: this.accountData.email,
        password: this.accountData.password,
      })
    );
  }

  // Method to handle login with Google
  loginWithGoogle() {
    this.isLoginWithGoogle = true;
    this.store.dispatch(AuthActions.login());
  }

  // Method to handle register click
  registerclick() {
    this.isLoginWithGoogle = false;
    this.router.navigate(['/register']);
    console.log(this.isLoginWithGoogle);
  }

  private resetLoginState() {
    this.isGetSuccessUser = false;
    this.accountData = {
      email: '',
      password: '',
    };
  }
}
