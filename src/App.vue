<template>
  <div id="app">
    <button @click="logout">logout</button>
    <button @click="login">login</button>
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

export default {
  name: 'app',
  data() {
    return {
      auth: false,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.auth = user ? true : false;
    }); 
  },
  methods: {
    login() {
      firebase.auth().signInWithRedirect(provider);        
    },
    logout() {
      firebase.auth().signOut().then(() => {
        this.auth = false;
      }, error => {console.log(error)});
    }
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
