<template>
  <div id="app">
    <hello></hello>
  </div>
</template>

<script>
import * as firebase from 'firebase';

import Hello from './components/Hello'

// set Firebase
const config = {
  apiKey: "AIzaSyCTJNSEAX4odrffbgGC_nobsPOPZMd7qgc",
  authDomain: "vue-chat-77b39.firebaseapp.com",
  databaseURL: "https://vue-chat-77b39.firebaseio.com",
  storageBucket: "vue-chat-77b39.appspot.com",
  messagingSenderId: "545307205041"
}
firebase.initializeApp(config);

const database = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    }); 
  }
  console.log(user);
});

export default {
  name: 'app',
  created() {

  },
  components: {
    Hello
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
