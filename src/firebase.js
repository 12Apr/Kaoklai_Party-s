import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getFirestore } from 'firebase/firestore';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCR7-SprxU3nsBecuxNmRLjG3Aj1ozinrA",
  authDomain: "kaoklai-party-vote.firebaseapp.com",
  projectId: "kaoklai-party-vote",
  storageBucket: "kaoklai-party-vote.firebasestorage.app",
  messagingSenderId: "570893065593",
  appId: "1:570893065593:web:070d215e62a436efd0a3a8"
};

const app = initializeApp(firebaseConfig);
const RECAPTCHA_V3_SITE_KEY = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY;

if (import.meta.env.DEV) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

if (RECAPTCHA_V3_SITE_KEY) {
  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(RECAPTCHA_V3_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    });
  } catch (err) {
    console.error('App Check init failed:', err);
  }
} else {
  console.warn('VITE_RECAPTCHA_V3_SITE_KEY not set — App Check disabled');
}

export const db = getFirestore(app);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
};

export const watchAuth = (callback) => onAuthStateChanged(auth, callback);