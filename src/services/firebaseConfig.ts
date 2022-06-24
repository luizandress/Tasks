// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDboclUvmgR_9RMt5_mrgsWlbGY5ZFbehA",
    authDomain: "todoapp-5ff2d.firebaseapp.com",
    projectId: "todoapp-5ff2d",
    storageBucket: "todoapp-5ff2d.appspot.com",
    messagingSenderId: "9906108633",
    appId: "1:9906108633:web:0e907e97bc20af4fdbe6c8"
};

export function firebaseInitialize() {
    initializeApp(firebaseConfig);
}