firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        
        /*firestore.collection('user_info').doc(uid).set({
        
        });*/
        // ...
        firestore.collection('user_info').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                if (doc.id != uid ){
                    $( ".list-group" ).append( "<li>" + doc.data()["fname"] + " " +doc.data()["lname"] + " " + "<button type='button' onClick='button_click(this.id)' id='"+doc.id + "' class='btn btn-success btn-sm'>Add</button> </li> <br>" );
                }
            });
        });

        function button_click(clicked) { 
            console.log(clicked)
            firestore.collection('user_friends').doc(uid).doc(clicked).set({
                
            });
        }         

        } else {
            // User is signed out
            // ...
            window.location.replace("index.php")
        }
  });


