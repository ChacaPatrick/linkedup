firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        
        /*firestore.collection('user_info').doc(uid).set({
        
        });*/
        // ...
            firestore.collection('user_info').get().then(function(querySnapshot) {
                var y = 0
                var para = document.createElement("li")
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    /*console.log(doc.id, " => ", doc.data());
                    document.write('<li>'+ doc.data()["fname"] + " " +doc.data()["lname"]+' </li> ')
                    document.write('<br></br>')*/
                    var po = doc.data()["fname"];
                    console.log(po)
                });
            });
        
        

        } else {
            // User is signed out

        }
  });


