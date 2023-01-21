// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCf5NNVPlQ5BrkmoVlL_Eq0sFrwSlgA2-c",
    authDomain: "todolist-mnz.firebaseapp.com",
    projectId: "todolist-mnz",
    storageBucket: "todolist-mnz.appspot.com",
    messagingSenderId: "548951221541",
    appId: "1:548951221541:web:cd516fc25ffba9ef90a6cc",
    measurementId: "G-4HNVR29P34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);