import Firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCTJNSEAX4odrffbgGC_nobsPOPZMd7qgc",
  authDomain: "vue-chat-77b39.firebaseapp.com",
  databaseURL: "https://vue-chat-77b39.firebaseio.com",
  storageBucket: "vue-chat-77b39.appspot.com",
  messagingSenderId: "545307205041"
}
Firebase.initializeApp(config);

export default Firebase;