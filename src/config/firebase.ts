// Packages
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth/cordova';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export { appFirebase, auth, db };
