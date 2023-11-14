document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");


  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = signupForm.querySelector("#firstName").value;
    const lastName = signupForm.querySelector("#lastName").value;
    const email = signupForm.querySelector("#email").value;
    const password = signupForm.querySelector("#password").value;
    const cpassword = signupForm.querySelector("#cpassword").value;
    const userType = signupForm.querySelector("#userType").value;

      if (password === cpassword) {
          // Call Firebase function for user signup
        //   signup(firstName, lastName, email, password, userType);
          console.log("correct")
      } else {
          alert("password doews not match")
      }
  });

 
});


// Function to sign up a user
function signup(email, password, userType) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Additional user information can be stored in the database
            const user = userCredential.user;
            saveUserType(user.uid, userType);
            window.location.href = 'login.html'; 
        })
        .catch((error) => {
            const errorMessage = error.message;
            displayError(errorMessage);
        });
}

// Function to save user type in the database
function saveUserType(userId, userType) {
    // Implement database saving logic if needed
}


// login 
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginForm.querySelector("#email").value;
    const password = loginForm.querySelector("#password").value;

    // Call Firebase function for user login
    login(email, password);
  });


});

// Function to log in a user
function login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Redirect to the dashboard or appropriate page
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            displayError(errorMessage);
        });
}

