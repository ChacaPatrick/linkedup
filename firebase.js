//Firebase Config

var firebaseConfig = {
    apiKey: "AIzaSyCkv8boKr73hAU197MfAGkDLPXF7pSoUqs",
    authDomain: "linkup-302622.firebaseapp.com",
    projectId: "linkup-302622",
    storageBucket: "linkup-302622.appspot.com",
    messagingSenderId: "969184390162",
    appId: "1:969184390162:web:aae593d3749a425d6bbccb",
    measurementId: "G-0M028TPSXQ"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var firestore = firebase.firestore()


