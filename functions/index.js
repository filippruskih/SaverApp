const functions = require("firebase-functions");
const { initializeApp } = require('firebase-admin/app');


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1qniOgt-Ut-KnD8oAGgfaeu8niTesQCI",
    authDomain: "saverhomeenergysavingapp.firebaseapp.com",
    databaseURL: "https://saverhomeenergysavingapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "saverhomeenergysavingapp",
    storageBucket: "saverhomeenergysavingapp.appspot.com",
    messagingSenderId: "736551254380",
    appId: "1:736551254380:web:f8279de8cd35e89a0edb49",
    measurementId: "G-QNTM2P0N9N"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);