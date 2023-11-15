// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

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
const db = getFirestore(app);

const signUpForm = async (e) => {
  e.preventDefault();

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

  // Check if password matches confirm password
  if (password === cpassword) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userSignUp.email,
        userSignUp.password
      );

      // Signed up
      const user = userCredential.user;

      // Save additional user information to Firestore
      const userRef = doc(collection(db, "users"), user.uid);
      await setDoc(userRef, {
        firstName: userSignUp.firstName,
        lastName: userSignUp.lastName,
        email: userSignUp.email,
        userType: userSignUp.userType,
      });

      alert("Success");
       window.location.href = "login.html";

    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(errorMessage);
    }
  } else {
    alert("Password does not match");
  }
};



const loginForm = (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const userSignin = {
    email: email,
    password: password,
  };

  signInWithEmailAndPassword(auth, userSignin.email, userSignin.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      getUserTypeAndRedirect(user.email);
      alert("Success");
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(errorMessage);
    });
};

function redirectToPage(userType) {
  if (userType === "doctor") {
    window.location.href = "doctor.html";
  } else if (userType === "receptionist") {
    window.location.href = "receptionist.html";
  } else {
    console.log("Unknown user type");
    // Redirect to a default page or handle the case where userType is unknown
    window.location.href = "default.html";
  }
}

async function getUserTypeAndRedirect(email) {
  const userDoc = await getDoc(doc(db, "users", email));

  if (userDoc.exists()) {
    const userType = userDoc.data().userType;
  console.log(userType)
    redirectToPage(userType);
  } else {
    console.error("No user found with the provided email!");
  }
}



window.onload = function () {
  const signup = document.getElementById("signUpForm");
  const signin = document.getElementById("loginform");

  signup && signup.addEventListener("submit", signUpForm);
  signin && signin.addEventListener("submit", loginForm);
};