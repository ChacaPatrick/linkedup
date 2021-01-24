
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            mobiscroll.setOptions({
                locale: mobiscroll.localeEn,       // Specify language like: locale: mobiscroll.localePl or omit setting to use default
                theme: 'ios',                      // Specify theme like: theme: 'ios' or omit setting to use default
                themeVariant: 'dark'              // More info about themeVariant: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-themeVariant
            });
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            var user = firebase.auth().currentUser;
            var calendar,
            popup,
            range,
            oldEvent,
            showArrow,
            tempID = 5,
            tempEvent = {},
            deleteEvent,
            restoreEvent,
            titleInput = document.getElementById('event-title'),
            descriptionTextarea = document.getElementById('event-desc'),
            allDaySwitch = document.getElementById('event-all-day'),
            freeSegmented = document.getElementById('event-status-free'),
            busySegmented = document.getElementById('event-status-busy'),
            deleteButton = document.getElementById('event-delete'),
            user_firestore_event = firestore.collection("user_events").doc(firebase.auth().currentUser.uid).collection("events");
            user_firestore_info = firestore.collection('user_info').doc(firebase.auth().currentUser.uid);
            now = new Date(),
            myData = [];
            console.log(user_firestore_info.get().data)

                //CHANGE VALUES TO VARIABLE FOR LOOP FROM CLOUD FIRESTORE
        user_firestore_info.get().then(function(doc) {
        user_firestore_event.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if(doc.id !=0){
                    calendar.addEvent({
                        id: doc.id,
                        start: new Date(doc.data()["s_year"], doc.data()["s_month"], doc.data()["s_day"], doc.data()["s_hours"], doc.data()["s_minutes"]),
                        end: new Date(doc.data()["e_year"], doc.data()["e_month"], doc.data()["e_day"], doc.data()["e_hours"], doc.data()["e_minutes"]),
                        title: doc.data()["title"],
                        color: doc.data()["color"]
                    });

                }
                
            });
        });

                
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
        firestore.collection('user_info').doc(sessionStorage.getItem("friend_id")).get().then(function(doc2) {
            firestore.collection("user_events").doc(sessionStorage.getItem("friend_id")).collection("events").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc2) {
                    // doc2.data() is never undefined for query doc2 snapshots
                    console.log(sessionStorage.getItem("friend_id"))
                    console.log(doc2.id, " => ", doc2.data());
                    if(doc2.id !=0){
                        calendar.addEvent({
                            id: doc2.id,
                            start: new Date(doc2.data()["s_year"], doc2.data()["s_month"], doc2.data()["s_day"], doc2.data()["s_hours"], doc2.data()["s_minutes"]),
                            end: new Date(doc2.data()["e_year"], doc2.data()["e_month"], doc2.data()["e_day"], doc2.data()["e_hours"], doc2.data()["e_minutes"]),
                            title: doc2.data()["title"],
                            color: '#FF6700'
                        });

                    }
                    
                });
            });

                
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


        calendar = mobiscroll.eventcalendar('#demo-add-delete-event', {
            view: {                            // More info about view: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-view
                schedule: { type: 'week' }
            },
            data: myData,                      // More info about data: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-data
            dragToCreate: false,                // More info about dragToCreate: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-dragToCreate
            dragToMove: false,                  // More info about dragToMove: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-dragToMove
            dragToResize: false,                // More info about dragToResize: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-dragToResize
            onEventClick: function (args) {    // More info about onEventClick: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#event-onEventClick
                oldEvent = { ...args.event };
                tempEvent = args.event;

                if (!popup.isVisible()) {
                    createEditPopup(args);
                }
            },
            onEventCreated: function (args) {  // More info about onEventCreated: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#event-onEventCreated
                popup.close();
                // store temporary event
                tempEvent = args.event;
                createAddPopup(args.target);
            }
        });
    
      
                // ...
    } 
    else {
        // User is signed out
        // ...
    }
    });

    
