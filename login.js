const btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', e =>{
    e.preventDefault()
    const email = document.getElementById('loginInputEmail1').value;
    const password = document.getElementById('loginInputPassword1').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
    
});


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      window.location.replace("home.php")
      // ...
    } else {
      // User is signed out
      // ...
      console.log("User is not signed in")
    }
  });