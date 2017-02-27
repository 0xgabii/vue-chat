<template>
  <div class="chat-page">
    <header :style="{backgroundColor: mainColor}">
      <span>{{online}}</span>
      <span>{{headerMsg}}</span>
      <button @click="auth">logout</button>
    </header>

    <div class="chat-list">
      <div class="chat" 
        v-for="item in chatList">
        <div class="info">
          <img class="info-thumbnail" :src="userList[_.findIndex(userList, {uid: item.user})].profile_picture" alt="profile">       
          <div class="info-text">
            <span class="username">{{userList[_.findIndex(userList, {uid: item.user})].username}}</span>
            <span class="time">{{new Date(item.time).getHours() + ':' + new Date(item.time).getMinutes()}}</span>
          </div> 
        </div>
        <div class="content" v-html="item.content"></div>        
      </div>
    </div>

    <div class="type-chat">      
      <input 
        type="text" 
        v-model="newChat" 
        @keyup.enter="sendChat(newChat)"
        placeholder="Say something...">     
      <input type="file" id="file" @change="sendImage">
      <div class="btn-group">
        <label class="labelBtn" for="file" :style="{color: mainColor}">add photo</label>
        <button class="btn" @click="sendChat(newChat)" :style="{backgroundColor: mainColor}">SEND</button>    
      </div>             
    </div> 
  </div>
</template>

<script>
import Firebase from '../firebaseHelper'
import _ from 'lodash'

const database = Firebase.database();
const chats = database.ref('chats');
const users = database.ref('users');
// for image store
const storageRef = Firebase.storage().ref();

// scroll to bottom
chats.on('child_added', data => {
  setTimeout(() => {
    document.querySelector('.chat-list').scrollTop = document.querySelector('.chat-list').scrollHeight;
  });
});

const XSSfilter = content => content.replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default {
  name: 'chatpage',
  props: [
    'auth',
    'currentUser'
  ],
  data() {
    return {
      mainColor: '#673ab7',
      headerMsg: 'Vue-Chat',
      newChat: ''
    }
  },
  firebase: {
    chatList: chats,
    userList: users,
  },
  computed: {
    // lodash
    _() {
      return _;
    },
    online() {
      return 'online: ' + this.userList.length;
    },
  },
  methods: {
    sendChat(data) {
      if(data != ''){
        chats.push({
          user: this.currentUser.uid,
          content: XSSfilter(data),
          time: new Date().toString()
        });
        this.newChat = '';
      }
    },
    sendImage(e){
      const file = e.target.files[0];
      const fileName = file.name;
      const fileType = file.type;

      if(fileType != 'image/jpeg' && fileType != 'image/gif' && fileType != 'image/png'){
        alert('photo only!');
        e.target.value = '';
        return;
      }
      storageRef.child('images/' + fileName).put(file).then(snapshot => {
        chats.push({
          user: this.currentUser.uid,
          content: `<img src="${snapshot.downloadURL}" />`,
          time: new Date().toString()
        });
      });
    }
  }
}
</script>

<style>
.chat-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f2f2f2;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 3.5rem;
  color: white;
  box-shadow: 0 5px 10px -5px rgba(0,0,0,.8);
  transition: all 0.3s;
}
header > button {
  padding: 0.5rem 1.2rem;
  background-color: transparent;
  border: 2px solid white;
  border-radius: 3px;
  color: white;  
  transition: all 0.3s;
}
header > button:hover {  
  background-color: rgba(255,255,255, 0.2);
}
.chat-list {
  height: calc(100vh - 8.5rem);
  overflow-x: hidden;
  overflow-y: auto;  
  padding: 0.5rem 1rem;
}
.chat {
  padding: 0.5rem;
}
.info {
  position: relative;
  padding-bottom: 0.5rem;
}
.info-thumbnail {
  position: absolute;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 100%;
  border: none;
  object-position: center;
  object-fit: cover;
}
.info-text,
.content {
  margin-left: 3.5rem;
}
.username {

}
.time {

}
.content {
  display: inline-block;
  padding: 0.6rem 1rem;
  background-color: white;    
  border-radius: 3px;
  color: black;
  font-weight: 300;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
  animation: bubble 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
.content.me {
  background-color: #673ab7;
  color: white;
}
.content > img {
  max-width: 40vw;
  max-height: 40vh;
}
.type-chat {
  position: absolute;
  bottom: 0;
  height: 5rem;
  width: 100%;
  background-color: white;
  box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);
}
input[type="text"] {
  position: absolute;
  left: 2rem;
  top: 50%;
  padding: 1rem;
  width: calc(100% - 15rem);  
  background-color: transparent;  
  border: none;
  outline: none;  
  font-size: 1.25rem;  
  transform: translateY(-50%);
}
input[type="file"] {
  width: 0;
  height: 0;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}
.btn-group {
  position: absolute;
  right: 2rem;
  top: 50%;
  height: 3rem;
  transform: translateY(-55%);
}
.btn,
.labelBtn {
  display: inline-block;
  padding: 1rem 1.5rem;
  margin: 0 0.2rem;
  background-color: transparent;
  border: none; 
  border-radius: 3px;
  outline: none;
  font-size: 1rem;
  transition: all 0.3s;
}
.btn {
  vertical-align: bottom;
  color: white;
}
.btn:hover{
  border-radius: 3rem;
}
.labelBtn:hover {
  background-color: rgba(0,0,0, 0.1);
}
@keyframes bubble{
  0%{
    opacity: 0;
    transform: scale(0);
  }
  50%{
    transform: scale(1.2);
  }
  100%{
    opacity: 1;
    transform: scale(1);
  }
}

</style>
