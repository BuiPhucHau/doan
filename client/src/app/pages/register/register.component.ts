import { Component, Inject } from '@angular/core';
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
import { TuiAlertService } from '@taiga-ui/core';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ShareModule, TaigaModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  // Flag to indicate if login is with Google
  isLoginWithGoogle = false;

  // Firebase user object
  userFirebase: UserFirebase = <UserFirebase>{};

  // Observable for user state
  user$ = this.store.select('user', 'user');

  // Registration form group with validation
  regisForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-zA-Z0-9]+/g),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]+/g),
    ]),
    address: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>,
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService
  ) {
    // Listen for authentication state changes
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoginWithGoogle = true;
        this.userFirebase = {
          uid: user.uid,
          picture: user.photoURL || '',
          email: user.email || '',
          name: user.displayName || '',
        };
        // Dispatch action to store Firebase user data
        this.store.dispatch(AuthActions.storageUserFirebase(this.userFirebase));
      }
    });

    // Subscribe to user creation success state
    this.store.select('user', 'isCreateSussess').subscribe((state) => {
      if (state) {
        this.router.navigate(['/base/home']);
      }
    });
  }

  ngOnInit() {
    // Nếu đã đăng nhập bằng Google, set giá trị cho form
    if (this.isLoginWithGoogle) {
      this.regisForm.patchValue({
        name: this.userFirebase.name,
        email: this.userFirebase.email
      });
    }
  }

  // Method to handle registration click
  registerclick() {
    if (this.regisForm.valid) {
      if (this.isLoginWithGoogle) {
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
        // Dispatch action to create user with Google data
        this.store.dispatch(UserActions.createUser({ user: regisData }));
        console.log(regisData);
      } else {
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
        // Dispatch action to create user with form data
        this.store.dispatch(UserActions.createUser({ user: regisData }));
      }
    } else {
      // Hiển thị thông báo lỗi cho người dùng nếu form không hợp lệ
      this.alerts
      .open('Please fill in all information.', {
        status: 'error',
      })
      .subscribe();
    }
  }
  

  // Method to handle login click
  loginclick() {
    this.router.navigate(['/login']);
  }
}
