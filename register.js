const emailInput = document.getElementById('inputEmail1');
const passInput = document.getElementById('inputPassword1');
const passConfirm = document.getElementById('inputPassword2');
const fnameInput = document.getElementById('inputFirstName');
const lnameInput = document.getElementById('inputLastName');
const btnSignup = document.getElementById('btnSignUp');


btnSignup.addEventListener('click', e =>{
    e.preventDefault();
    const email = emailInput.value;
    const password = passInput.value;
    const check = passConfirm.value;
    if (check == password && fnameInput.value != null && lnameInput.value != null){
      
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        firestore.collection('user_info').doc(userCredential.user.uid).set({
          fname: fnameInput.value,
          lname: lnameInput.value,
          event_count: 1
        });
        
        firestore.collection("user_events").doc(userCredential.user.uid).collection("events").doc("0").set({
          random: 100
        })
        //firestore.collection("user_events").doc(userCredential.user.uid).collection("event").doc("0").delete();

        setTimeout(function(){
          window.location.href = "home.php";
        }, 400)
        
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
      });
      
    }
    else{
        window.alert("Make sure inputs are correct!");
    }
    
});


