import { initializeApp } from "firebase/app"; 
import {getAnalytics} from "firebase/analytics";

export const environment = {
    apiKey: 'AIzaSyByyHSFMRGFkkGu3c1PrqoPF_MHzGn8JX0',
    authDomain: 'datanhahang.firebaseapp.com',
    databaseURL:
      'https://datanhahang-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'datanhahang',
    storageBucket: 'datanhahang.appspot.com',
    messagingSenderId: '861803711301',
    appId: '1:861803711301:web:963b6f5a2d22a803e58c2c',
    measurementId: 'G-85H7ZW5HQ5',
};

const app = initializeApp(environment);
const analytics = getAnalytics(app);
