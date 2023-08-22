import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAW1SKzFku27gab2Zqh6PM8ESmCMmzsMzQ",
  authDomain: "fir-auth-exercise-fcba4.firebaseapp.com",
  projectId: "fir-auth-exercise-fcba4",
  storageBucket: "fir-auth-exercise-fcba4.appspot.com",
  messagingSenderId: "349200533470",
  appId: "1:349200533470:web:a8a09dd3d13c16b317bf4f",
  measurementId: "G-NP10CCCL3L"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)


const provider = new GoogleAuthProvider()



export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((res) => {
    const name = res.user.displayName;
    const email = res.user.email;
    const profilePic = res.user.photoURL;

    localStorage.setItem("name", name)
    localStorage.setItem("email", email)
    localStorage.setItem("profilePic", profilePic)
  }).catch((error) => {
    console.log(error);
  })
}

