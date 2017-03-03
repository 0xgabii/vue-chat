<template>
  <div id="app">
    <landing-page 
      v-if="!auth"
      :auth="login" />
    <chat-page 
      v-if="auth"
      :auth="logout" />
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
  created() {
    Firebase.auth().onAuthStateChanged(user => {
      if(user) {
        const userObj = {
          uid: user.uid,
          username: user.displayName,
          picture : user.photoURL,
        }        
        database.ref('users/' + user.uid).set(userObj);
        database.ref('online/' + user.uid).set(userObj);

        this.$store.dispatch('setMyAccount', userObj); 
        this.$store.dispatch('setAuth', true);
      } else{
        this.$store.dispatch('setAuth', false);
      }
    }); 
  },
  computed: {
    auth() {
      return this.$store.state.auth;
    },
    myAccount() {
      return this.$store.state.myAccount;
    }
  },
  methods: {
    login() {
      Firebase.auth().signInWithRedirect(provider);        
    },
    logout() {
      this.$store.dispatch('setAuth', false);
      database.ref('online/' + this.myAccount.uid).remove();
      Firebase.auth().signOut();
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
