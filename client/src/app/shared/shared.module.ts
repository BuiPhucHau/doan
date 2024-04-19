import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
// import { dishReducer } from '../ngrx/reducers/dish.reducer';
import { storageReducer } from '../ngrx/reducers/storage.reducer';
import { userReducer } from '../ngrx/reducers/user.reducer';
import { authReducer } from '../ngrx/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DishEffects } from '../ngrx/effects/dish.effects';
import { StorageEffects } from '../ngrx/effects/storage.effects';
import { AuthEffects } from '../ngrx/effects/auth.effects';
import { UserEffects } from '../ngrx/effects/user.effects';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../../environments/environments'; // Sửa đổi đường dẫn

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class ShareModule {}
