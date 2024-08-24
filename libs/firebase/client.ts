// Import the functions you need from the SDKs you need
import type { FirebaseOptions } from 'firebase/app';

import { initializeApp } from 'firebase/app';
// import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MESUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analyticsMock = {
//   logEvent: () => {},
//   setCurrentScreen: () => {},
//   setUserId: () => {},
// };

// export const analytics = (await isSupported())
//   ? getAnalytics(app)
//   : analyticsMock;
export const db = getFirestore(app);
export const storage = getStorage(app);
