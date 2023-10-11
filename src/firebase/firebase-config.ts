import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCMqn0fnNgNHS16iMTeQWSwQwFMnNQtrWk",
  authDomain: "connection-paulista.firebaseapp.com",
  databaseURL: "https://connection-paulista-default-rtdb.firebaseio.com",
  projectId: "connection-paulista",
  storageBucket: "connection-paulista.appspot.com",
  messagingSenderId: "599203550662",
  appId: "1:599203550662:web:c656ab8838fd5238ff4ec7"
};

export const app = initializeApp(firebaseConfig);