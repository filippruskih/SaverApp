const functions = require("firebase-functions");
const { initializeApp } = require('firebase-admin/app');


const firebaseConfig = {
  apiKey: "AIzaSyD1qniOgt-Ut-KnD8oAGgfaeu8niTesQCI",
  authDomain: "saverhomeenergysavingapp.firebaseapp.com",
  databaseURL: "https://saverapp.europe-west1.firebasedatabase.app/",
  projectId: "saverhomeenergysavingapp",
  storageBucket: "saverhomeenergysavingapp.appspot.com",
  messagingSenderId: "736551254380",
  appId: "1:736551254380:web:f8279de8cd35e89a0edb49",
  measurementId: "G-QNTM2P0N9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
