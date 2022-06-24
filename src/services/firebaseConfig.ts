// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4s4GC6GiCiiRSQjvajyHsro68YT6Z7dM",
    authDomain: "tasks-68b79.firebaseapp.com",
    projectId: "tasks-68b79",
    storageBucket: "tasks-68b79.appspot.com",
    messagingSenderId: "919906235460",
    appId: "1:919906235460:web:a42001052e934583263811"
  };

export function firebaseInitialize() {
    initializeApp(firebaseConfig);
}