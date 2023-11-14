// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"; // Correct import for auth functions

const firebaseConfig = {
  apiKey: "AIzaSyD-Sum90RcnnmjLzX2vcYcv9am4u0K6Bj8",
  authDomain: "clinic-management-347f6.firebaseapp.com",
  projectId: "clinic-management-347f6",
  storageBucket: "clinic-management-347f6.appspot.com",
  messagingSenderId: "1054900924414",
  appId: "1:1054900924414:web:9c567c63593153cd169aaf",
  measurementId: "G-Q9SE7KQ4WY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const signUpForm = (e) => {
  e.preventDefault();

  // Move these inside the function to capture values on form submission
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const cpassword = document.querySelector("#cpassword").value;
  const userType = document.querySelector("#userType").value;


    const userSignUp = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      cpassword: cpassword,
      userType: userType,
    };

    createUserWithEmailAndPassword(
      auth,
      userSignUp.email,
      userSignUp.password,
      userSignUp.userType
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log({ signup: user });
        alert("Success");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        // Handle errors as needed
      });

    console.log(userSignUp);
  } 

  const signup = document.getElementById("signUpForm");

  signup && signup.addEventListener("submit", signUpForm);


// login in
   const loginForm = (e) => {
     e.preventDefault();

     const email = document.querySelector("#email").value;
     const password = document.querySelector("#password").value;

     const userSignin = {
       email: email,
       password: password,
      //  userType: userType
     };

     signInWithEmailAndPassword(
       auth,
       userSignin.email,
       userSignin.password,
       userSignin.userType
     )
       .then((userCredential) => {
         // Signed up
         const user = userCredential.user;
         console.log({ signin: user });
         // ...
         alert("Success");
       })
       .catch((error) => {
         const errorMessage = error.message;
         alert(errorMessage);
         // Handle errors as needed
       });

     console.log(userSignin);
   }; 

  const signin = document.getElementById("loginform");

  signin && signin.addEventListener("submit", loginForm);

