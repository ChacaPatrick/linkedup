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
                        var user_main = user.uid;
                        
                        firestore.collection('user_friends').doc(user_main).collection("friends").doc(doc.id).get().then(function(doc2) {
                        if (doc2.exists) {
                            console.log("Document data:", doc2.data());
                            
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                                $( "#left" ).append( "<li>" + doc.data()["fname"] + " " +doc.data()["lname"] + " " + "<button type='button' onClick='button_click(this.id)' id='"+doc.id +","+user_main + "' class='btn btn-success btn-sm'>Add</button> </li> <br>" );
                            
                                firestore.collection('user_friends').doc(user_main).collection("not friends").doc(doc.id).set({
                                fname: doc.data()['fname'],
                                lname: doc.data()['lname']
                                });
                            }
                            }).catch(function(error) {
                            console.log("Error getting document:", error);
    });
                            
                            
                        }
                    });
                });

                firestore.collection('user_info').get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        if (doc.id != uid ){
                            var user_main = user.uid;
                            
                            firestore.collection('user_friends').doc(user_main).collection("friends").doc(doc.id).get().then(function(doc2) {
                            if (doc2.exists) {
                                console.log("Document data:", doc2.data()["lname"]);
                                $( "#right" ).append( "<li> "+ doc2.data()["fname"] + " " +doc2.data()["lname"] + " " + "<button type='button' onClick='button_click(this.id)' id='"+doc.id +","+user_main + "' class='btn btn-success btn-sm'>View</button> </li> <br>" );
                            
    
                            } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");

                            }
                            }).catch(function(error) {
                            console.log("Error getting document:", error);
    });
                            
                            
                        }
                    });
                });


                    

        } else {
            // User is signed out
            // ...
            window.location.replace("index.php")
        }
    });


    function button_click(clicked) { 
        var splt = clicked.split(",");
        firestore.collection('user_info').doc(splt[0]).get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                firestore.collection('user_friends').doc(splt[1]).collection("friends").doc(splt[0]).set({
                    fname: doc.data()['fname'],
                    lname: doc.data()['lname']
                });

                firestore.collection("user_friends").doc(splt[1]).collection("not friends").doc(splt[0]).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
        
    }   