const emailInput = document.getElementById('inputEmail1');
const passInput = document.getElementById('inputPassword1');
const passConfirm = document.getElementById('inputPassword2');
const fnameInput = document.getElementById('inputFirstName');
const lnameInput = document.getElementById('inputLastName');
const btnSignup = document.getElementById('btnSignUp');

var db = firebase.firestore();
btnSignup.addEventListener('click', e =>{
    e.preventDefault();
    console.log('PEEPEEE');
    const email = emailInput.value;
    const password = passInput.value;
    const check = passConfirm.value;
    if (check == password && fnameInput.value != null && lnameInput.value != null){

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        window.location.replace("home.php");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
      });

    }
    else{
        window.alert("Make sure inputs are correct!")
    }
    
});


//&& fnameInput.value != null && lnameInput.value != null