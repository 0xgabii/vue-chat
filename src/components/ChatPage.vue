<template>
  <div class="chat-page">
    <header>
      
      이용자 수: {{currentUser}}
      <h3>{{headerMsg}}</h3>
    </header>
    <button @click="auth">logout</button>
    
    <div class="chat-list">
      <div class="chat" 
        v-for="item in chatList">
        <img class="profile" :src="userList[_.findIndex(userList, {uid: item.user})].profile_picture" alt="profile">          
        <div class="chat-box">
          <div class="info">
            <span class="name">{{userList[_.findIndex(userList, {uid: item.user})].username}}</span>
            <span class="time">{{item.time}}</span>
          </div>
          <div class="content">{{item.content}}</div>
        </div>        
      </div>
    </div>

    <div class="type-chat">
      <input type="text" v-model="newChat">
      <button @click="sendChat(newChat)">sendChat</button>    
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'chatpage',
  props: [
    'chatList',
    'userList',
    'auth',
    'sendChat'
  ],
  data() {
    return {
      headerMsg: 'Vue-Chat',
      newChat: ''
    }
  },
  computed: {
    // lodash
    _() {
      return _;
    },
    currentUser() {
      return this.userList.length;
    },
  },
  method: {
    
  }
}
</script>

<style scoped>
.chat-page {
  width: 100vw;
  min-height: 100vh;
  background-color: #e9ecef;
}
header {
  background-color: #673ab7;
  color: white;
  box-shadow: 0 5px 10px -5px rgba(0,0,0,.8);
}
header > h3 {
  padding: 1rem;
  text-align: center;
}
.chat-list {

}
.chat {
  display: flex;
  padding: 1rem 0.5rem;
  border-bottom: 2px solid gray;
}
.profile {
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  border: none;
  object-position: center;
  object-fit: cover;
}
.chat-box {
  margin-left: 0.5rem;
}
.info {

}
.name {

}
.time {

}
.content {

}
</style>
