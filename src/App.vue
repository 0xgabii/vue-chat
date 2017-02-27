<template>
  <div id="app">
    <landing-page 
      v-if="!auth"
      :auth="login" />
    <chat-page 
      v-if="auth"
      :auth="logout"
      :currentUser="currentUser" />
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
      currentUser: {}
    }
  },  
  created() {
    Firebase.auth().onAuthStateChanged(user => {
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
      Firebase.auth().signInWithRedirect(provider);        
    },
    logout() {
      this.auth = false;
      database.ref('users/' + this.currentUser.uid).remove();
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
