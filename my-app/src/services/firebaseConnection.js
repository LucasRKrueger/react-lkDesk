import firebase from "firebase";
import'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyA135aqNNCWvYsLjN30McdbhC6Uoep72Kc",
    authDomain: "lkdesk.firebaseapp.com",
    projectId: "lkdesk",
    storageBucket: "lkdesk.appspot.com",
    messagingSenderId: "352464677521",
    appId: "1:352464677521:web:f43ec6ac6b72893e606d30"
};

if(!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);