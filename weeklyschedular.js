
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
            console.log(myData);
            let i = doc.data()["event_count"];
            let j = 1;


            user_firestore_event.get().then(function(querySnapshot) {
                var temp = []
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
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
        


        function createAddPopup(elm) {
            // hide delete button inside add popup
            deleteButton.style.display = 'none';

            deleteEvent = true;
            restoreEvent = false;

            // set popup header text and buttons for adding
            popup.setOptions({
                headerText: 'New event',       // More info about headerText: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-headerText
                buttons: [                     // More info about buttons: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-buttons
                    'cancel',
                    {
                        cssClass: 'mbsc-popup-button-primary',
                        text: 'Add',
                        keyCode: 'enter',
                        handler: function () {
                            calendar.updateEvent(tempEvent);
                            /*console.log(tempEvent);
                            console.log(tempEvent["titles"]);
                            console.log("Month: " + tempEvent["start"].getMonth());
                            console.log("Day: " + tempEvent["start"].getDate());
                            console.log("Year: " + tempEvent["start"].getFullYear());
                            console.log("Hour: " + tempEvent["start"].getHours());
                            console.log("Minute: " + tempEvent["start"].getMinutes());
                            console.log("Month: " + tempEvent["end"].getMonth());
                            console.log("Day: " + tempEvent["end"].getDate());
                            console.log("Year: " + tempEvent["end"].getFullYear());
                            console.log("Hour: " + tempEvent["end"].getHours());
                            console.log("Minute: " + tempEvent["end"].getMinutes());*/
                            user_firestore_info.get().then(function(doc) {
                                console.log(doc.data()["event_count"])
                                let i = doc.data()["event_count"]
                                user_firestore_event.doc(i.toString()).set({
                                    s_month: tempEvent["start"].getMonth(),
                                    s_day: tempEvent["start"].getDate(),
                                    s_year: tempEvent["start"].getFullYear(),
                                    s_hours: tempEvent["start"].getHours(),
                                    s_minutes: tempEvent["start"].getMinutes(),
                                    e_month: tempEvent["end"].getMonth(),
                                    e_day: tempEvent["end"].getDate(),
                                    e_year: tempEvent["end"].getFullYear(),
                                    e_hours: tempEvent["end"].getHours(),
                                    e_minutes: tempEvent["end"].getMinutes(),
                                    title: tempEvent["title"],
                                    color: '#4c8bf5'
                                    })
                                i++;
                                firestore.collection('user_info').doc(uid).update({
                                    event_count: i
                                    });
                            }).catch(function(error) {
                                console.log("Error getting document:", error);
                            });
                            
                        
                            
                            //console.log(tempEvent["end"]);
                            deleteEvent = false;
                            popup.close();
                        }
                    }
                ]
            });

            // fill popup with a new event data
            mobiscroll.getInst(titleInput).value = tempEvent.title;
            mobiscroll.getInst(descriptionTextarea).value = '';
            mobiscroll.getInst(allDaySwitch).checked = false;
            range.setVal([tempEvent.start, tempEvent.end]);
            mobiscroll.getInst(busySegmented).checked = true;

            // set anchor for the popup
            popup.setOptions({ anchor: elm, showArrow: true });

            popup.open();
            // show popup arrow
            showArrow = true;
        }

        function createEditPopup(args) {
            var ev = args.event;
            // show delete button inside edit popup
            deleteButton.style.display = 'block';

            deleteEvent = false;
            restoreEvent = true;

            // set popup header text and buttons for editing
            popup.setOptions({
                headerText: 'Edit event',      // More info about headerText: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-headerText
                buttons: [                     // More info about buttons: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-buttons
                    'cancel',
                    {
                        cssClass: 'mbsc-popup-button-primary',
                        text: 'Save',
                        keyCode: 'enter',
                        handler: function () {
                            var date = range.getVal();
                            // update event with the new properties on save button click
                            calendar.updateEvent({
                                id: ev.id,
                                title: titleInput.value,
                                description: descriptionTextarea.value,
                                allDay: mobiscroll.getInst(allDaySwitch).checked,
                                start: date[0],
                                end: date[1],
                                free: mobiscroll.getInst(freeSegmented).checked,
                                color: ev.color,
                            });
                            restoreEvent = false;
                            popup.close();
                        }
                    }
                ]
            });

            // fill popup with the selected event data
            mobiscroll.getInst(titleInput).value = ev.title || '';
            mobiscroll.getInst(descriptionTextarea).value = ev.description || '';
            mobiscroll.getInst(allDaySwitch).checked = ev.allDay || false;;
            range.setVal([ev.start, ev.end]);

            if (ev.free) {
                mobiscroll.getInst(freeSegmented).checked = true;
            } else {
                mobiscroll.getInst(busySegmented).checked = true;
            }

            // change range settings based on the allDay
            range.setOptions(ev.allDay ? {
                controls: ['date'],
                responsive: {                  // More info about responsive: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-responsive
                    medium: {
                        controls: ['calendar'],
                        touchUi: false
                    }
                }
            } : {
                controls: ['datetime'],
                responsive: {                  // More info about responsive: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-responsive
                    medium: {
                        controls: ['calendar', 'time'],
                        touchUi: false
                    }
                }
            });

            // set anchor for the popup
            popup.setOptions({ anchor: args.domEvent.currentTarget, showArrow: true });
            popup.open();
            // we want to show the popup's arrow at this point
            showArrow = true;
        }

        function positionPopup() {
            // show or hide popup arrow
            if (showArrow) {
                showArrow = false;
            } else {
                popup.setOptions({ showArrow: false });
            }
        }

        calendar = mobiscroll.eventcalendar('#demo-add-delete-event', {
            view: {                            // More info about view: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-view
                schedule: { type: 'week' }
            },
            data: myData,                      // More info about data: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-data
            dragToCreate: true,                // More info about dragToCreate: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-dragToCreate
            dragToMove: true,                  // More info about dragToMove: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-dragToMove
            dragToResize: true,                // More info about dragToResize: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-dragToResize
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
            },
            onEventDeleted: function () {      // More info about onEventDeleted: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#event-onEventDeleted
                mobiscroll.toast({ 
                    
                    message: 'Event deleted'
                });
            }
        });

        popup = mobiscroll.popup('#demo-add-popup', {
            width: 400,                        // More info about width: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-width
            // showOverlay: false,
            display: 'bottom',                 // Specify display mode like: display: 'bottom' or omit setting to use default
            fullScreen: true,
            contentPadding: false,
            cssClass: 'crud-popup',
            onClose: function () {             // More info about onClose: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#event-onClose
                if (deleteEvent) {
                    calendar.removeEvent(tempEvent);
                } else if (restoreEvent) {
                    calendar.updateEvent(oldEvent);
                }
            },
            responsive: {
                medium: {
                    display: 'anchored',       // Specify display mode like: display: 'bottom' or omit setting to use default
                    width: 400,                        // More info about width: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-width
                    fullScreen: false,
                    touchUi: false
                }
            }
        });

        titleInput.addEventListener('input', function (ev) {
            // update current event's title
            tempEvent.title = ev.target.value;
            // update current event in calendar
            calendar.updateEvent(tempEvent);
        });

        descriptionTextarea.addEventListener('change', function (ev) {
            // update current event's title
            tempEvent.description = ev.target.value;
        });

        allDaySwitch.addEventListener('change', function () {
            var checked = this.checked
            // change range settings based on the allDay
            range.setOptions(checked ? {
                controls: ['date'],
                responsive: {                  // More info about responsive: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-responsive
                    medium: {
                        controls: ['calendar'],
                        touchUi: false
                    }
                }
            } : {
                controls: ['datetime'],
                responsive: {                  // More info about responsive: https://docs.mobiscroll.com/5-0-3/javascript/eventcalendar#opt-responsive
                    medium: {
                        controls: ['calendar', 'time'],
                        touchUi: false
                    }
                }
            });

            // update current event's allDay property
            tempEvent.allDay = checked;

            // update current event in calendar
            calendar.updateEvent(tempEvent);

            showArrow = false;

            positionPopup();
        });

        range = mobiscroll.datepicker('#event-date', {
            select: 'range',
            controls: ['datetime'],
            touchUi: true,
            startInput: '#start-input',
            endInput: '#end-input',
            showRangeLabels: false,
            responsive: {
                medium: {
                    controls: ['calendar', 'time'],
                    touchUi: false
                }
            },
            onChange: function (args) {
                var date = args.value;
                // update event's start date
                tempEvent.start = date[0];
                tempEvent.end = date[1];

                // update current event in calendar
                calendar.updateEvent(tempEvent);

                // navigate the calendar to the correct view
                calendar.navigate(date[0]);

                showArrow = false;

                positionPopup();
            }
        });

        document.querySelectorAll('input[name=event-status]').forEach(function (elm) {
            elm.addEventListener('change', function () {
                // update current event's free property
                tempEvent.free = mobiscroll.getInst(freeSegmented).checked;
            });
        });

        deleteButton.addEventListener('click', function () {
            // delete current event on button click
            calendar.removeEvent(oldEvent);
            console.log(oldEvent["id"]);
            user_firestore_event.doc(oldEvent["id"].toString()).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
            
            popup.close();

            mobiscroll.toast({ 
                
                message: 'Event deleted'
            });
        });
                // ...
    } 
    else {
        // User is signed out
        // ...
    }
    });

    
