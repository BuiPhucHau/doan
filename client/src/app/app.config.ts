import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideState, provideStore } from '@ngrx/store';
import { authReducer } from './ngrx/reducers/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './ngrx/effects/auth.effects';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { userReducer } from './ngrx/reducers/user.reducer';
import { dishReducer } from './ngrx/reducers/dish.reducer';
import { UserEffects } from './ngrx/effects/user.effects';
import { DishEffects } from './ngrx/effects/dish.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(TuiRootModule),
    importProvidersFrom(
      provideFirebaseApp(() =>  initializeApp(environment)), 
      TuiRootModule,
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(provideStorage(() => getStorage())),
    provideStore(),
    provideState({name: 'auth', reducer: authReducer}),
    provideState({name: 'user', reducer: userReducer}),
    provideState ({name: 'dish', reducer: dishReducer}),
    
    provideEffects([AuthEffects, UserEffects, DishEffects]),
    provideHttpClient(),
  ],
};
