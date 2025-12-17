
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy0VZmBzUXT6ELKdasjNLdaipOxX7Zhf8",
  authDomain: "twe-web.firebaseapp.com",
  projectId: "twe-web",
  storageBucket: "twe-web.firebasestorage.app",
  messagingSenderId: "813249477796",
  appId: "1:813249477796:web:78ca4b7936c9d4332eba31",
  measurementId: "G-E3N3XV05Y1"
};

// Evita inicializar Firebase más de una vez (importante en Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const db = firestore;
export default app;
