<template>
  <div id="app">
    <landing-page 
      v-if="!auth"
      :auth="login" />
    <chat-page 
      v-if="auth"
      :auth="logout"
      :myAcount="myAcount" />
  </div>
</template>

<script>
import Firebase from './firebaseHelper'
import LandingPage from './components/LandingPage'
import ChatPage from './components/ChatPage'

// set Firebase
const database = Firebase.database();
const provider = new Firebase.auth.GoogleAuthProvider();

export default {
  name: 'app',
  data() {
    return {
      auth: true,
      myAcount: {}
    }
  },
  created() {
    Firebase.auth().onAuthStateChanged(user => {
      if(user) {
        const userObj = {
          uid: user.uid,
          username: user.displayName,
          picture : user.photoURL,
        }
        this.myAcount = userObj;
        database.ref('users/' + user.uid).set(userObj);
        database.ref('online/' + user.uid).set(userObj);

        this.auth = true;
      } else{
        this.auth = false;
      }
    }); 
  },
  methods: {
    login() {
      Firebase.auth().signInWithRedirect(provider);        
    },
    logout() {
      this.auth = false;
      database.ref('online/' + this.myAcount.uid).remove();
      Firebase.auth().signOut().then(() => {}, errror => {console.log(error)});
    },
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
  overflow: hidden;
}
</style>
