<template>
  <div id="app">
    <landing-page 
      v-if="!auth"
      :auth="login" />
    <chat-page 
      v-if="auth"
      :auth="logout"
      :userList="userList"
      :chatList="chatList"
      :sendChat="sendChat" />
  </div>
</template>

<script>
import * as firebase from 'firebase';

import LandingPage from './components/LandingPage'
import ChatPage from './components/ChatPage'

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
const chats = database.ref('chats');
const users = database.ref('users');
const provider = new firebase.auth.GoogleAuthProvider();

export default {
  name: 'app',
  data() {
    return {
      auth: true,
      currentUser: {}
    }
  },
  firebase: {
    chatList: chats,
    userList: users,
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        const currentUser = {
          uid: user.uid,
          username: user.displayName,
          profile_picture : user.photoURL,
        }
        this.currentUser = currentUser;
        database.ref('users/' + user.uid).set(currentUser);

        this.auth = true;
      } else{
        this.auth = false;
      }
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
    },
    sendChat(data) {
      chats.push({
        user: this.currentUser.uid,
        content: data,
        time: new Date().toString()
      });
    }
  },
  components: {
    ChatPage,
    LandingPage
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-weight: 400;
}
body {
  font-family: 'Roboto', sans-serif;
  overflow-x: hidden;
}
</style>
