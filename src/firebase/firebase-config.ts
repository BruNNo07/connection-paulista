import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBYE-2A3jtqbVmheqR2vDRxXy3xT7M67Xc",
  authDomain: "connection-paulista-3cd9b.firebaseapp.com",
  projectId: "connection-paulista-3cd9b",
  storageBucket: "connection-paulista-3cd9b.appspot.com",
  messagingSenderId: "313744264404",
  appId: "1:313744264404:web:180640ede42b6d1dcf7f41"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});