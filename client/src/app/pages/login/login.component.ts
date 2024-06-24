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
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  // Flags for different login methods
  isLoginWithGoogle = false;
  isLoginWithAccount = false;

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

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>
  ) {
    
    // Listen for authentication state changes
    onAuthStateChanged(this.auth, (user) => {
      if (user && user.email) {
        this.isLoginWithGoogle = true;
        this.userFirebase = {
          uid: user.uid,
          email: user.email || '',
          name: user.displayName || '',
          picture: user.photoURL || '',
        };
        // Dispatch action to get user by email
        this.store.dispatch(UserActions.getByEmail({ email: user.email || "" }));
      }
    });

    // Subscribe to user observable
    this.user$.subscribe((user) => {
      if (user && user.email) {
        this.isGetSuccessUser = true;
        if (this.isLoginWithAccount && this.accountData.email !== '') {
          if (user.email === this.accountData.email) {
            if (user.password === this.accountData.password) {
              const userAsJson = JSON.stringify(user);
              sessionStorage.setItem('user', userAsJson);
              this.router.navigate(['/base/home']); // Navigate to home on successful login
              this.isGetSuccessUser = false;
              this.errorMessage = ''; // Clear error message
              console.log('login with account');
              this.accountData = {
                email: '',
                password: '',
              };
            } else {
              this.errorMessage = 'Invalid password. Please try again.';
              console.log('Invalid password. Please try again.');
              // Reset user state to avoid showing incorrect user data in navbar
              this.store.dispatch(UserActions.resetUser());
            }
          } else {
            this.errorMessage = 'Invalid email. Please try again.';
            console.log('Invalid email. Please try again.');
            // Reset user state to avoid showing incorrect user data in navbar
            this.store.dispatch(UserActions.resetUser());
          }
        } else if (this.isLoginWithGoogle && this.userFirebase.email === user.email && user.email === this.accountData.email) {
          const userAsJsonGG = JSON.stringify(user);
          sessionStorage.setItem('user', userAsJsonGG);
          this.router.navigate(['/base/home']); // Navigate to home on successful login with Google
          this.isGetSuccessUser = false;
          this.errorMessage = ''; // Clear error message
          console.log('login with Google');
        }
      } else if (this.isGetSuccessUser && user.email === "404 user not found" && this.isLoginWithGoogle) {
        console.log(this.userFirebase);
        this.errorMessage = 'User not found. Please register first.';
        // Reset user state to avoid showing incorrect user data in navbar
        this.store.dispatch(UserActions.resetUser());
      }
    });
  }

  // Method to handle login with account credentials
  loginWithAccount() {
    this.accountData = {
      email: this.accountForm.value.email || '',
      password: this.accountForm.value.password || '',
    };

    if (this.accountData.email !== '' && this.accountData.password !== '') {
      this.isLoginWithAccount = true;
      // Dispatch action to get user by email
      this.store.dispatch(
        UserActions.getByEmail({ email: this.accountData.email })
      );
      console.log(UserActions.getByEmail);
    } else {
      this.errorMessage = 'Please enter both email and password.';
    }
  }

  // Method to handle login with Google
  loginWithGoogle() {
    this.isLoginWithGoogle = true;
    // Dispatch action to initiate Google login
    this.store.dispatch(AuthActions.login());
  }

  // Method to handle register click
  registerclick() {
    this.isLoginWithGoogle = false;
    this.isLoginWithAccount = false;
    this.router.navigate(['/register']);
  }
}
