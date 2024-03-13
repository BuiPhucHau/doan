import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideRouter(routes), importProvidersFrom(TuiRootModule), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"datanhahang","appId":"1:861803711301:web:963b6f5a2d22a803e58c2c","databaseURL":"https://datanhahang-default-rtdb.asia-southeast1.firebasedatabase.app","storageBucket":"datanhahang.appspot.com","apiKey":"AIzaSyByyHSFMRGFkkGu3c1PrqoPF_MHzGn8JX0","authDomain":"datanhahang.firebaseapp.com","messagingSenderId":"861803711301","measurementId":"G-85H7ZW5HQ5"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase())), importProvidersFrom(provideStorage(() => getStorage()))]
};
