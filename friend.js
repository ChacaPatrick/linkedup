firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        
        /*firestore.collection('user_info').doc(uid).set({
        
        });*/
        // ...
        firestore.collection('user_info').get().then(function(querySnapshot) {
            var para = document.createElement("li")
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                var node = document.createTextNode(doc.data()["fname"] + " " +doc.data()["lname"] )
                para.appendChild(node);
                para.appendChild(document.createElement("br"));
                var element = document.getElementById("left");
                element.appendChild(para);
            });
        });


        } else {
            // User is signed out
            // ...
            window.location.replace("index.php")
        }
  });


