<template>
  <div class="chat-page">
    <header :style="{backgroundColor: mainColor}">      
      <span @click="colorPicker.visible = true">
        <i class="material-icons">color_lens</i>
      </span>
      <h3>Vue-Chat</h3>
      <button @click="auth">Logout</button>
    </header>
    
    <color-picker 
      v-if="colorPicker.visible"
      :data="colorPicker.data"
      :selectColor="changeMainColor"
      :close="() => { colorPicker.visible = false}" />        

    <div class="online-list-btn" @click="modals.onlineUsers.visible = true">
       <i class="material-icons">person</i>
       <span>{{online}}</span>
    </div>    

    <transition-group tag="div" class="chat-list" name="chat-list">        
      <div class="chat" 
        v-for="item in chatList"
        :key="item.user"
        :class="{myChat: item.user == myAccount.uid}">
        <div class="info">
          <img 
            class="info-thumbnail" 
            v-if="item.user != myAccount.uid"
            :src="userList[_.findIndex(userList, {uid: item.user})].picture">       
          <div class="info-text">
            <span 
              class="username"
              v-if="item.user != myAccount.uid">
              {{userList[_.findIndex(userList, {uid: item.user})].username}}
            </span>            
          </div> 
        </div>

        <span class="time" 
          v-if="item.user == myAccount.uid"
          v-text="new Date(item.time).toLocaleString()" />

        <div class="content" v-html="item.content" @click="contentClick"></div>

        <span class="time" 
          v-if="item.user != myAccount.uid"
          v-text="new Date(item.time).toLocaleString()" />

      </div>
    </transition-group>

    <div class="type-chat">      
      <input 
        type="text" 
        v-model="newChat" 
        @keyup.enter="sendChat(newChat)"
        placeholder="Say something...">
      <div class="btn-group">
        <button class="btn" @click="modals.photoUpload.visible = true" :style="{color: mainColor}">add photo</button>
        <button class="btn" @click="sendChat(newChat)" :style="{backgroundColor: mainColor}">Send</button>    
      </div>             
    </div> 

    <transition name="modal">
      <photo-upload 
        v-if="modals.photoUpload.visible"
        :color="mainColor"      
        :sendImage="sendImage" 
        :modalClose="modalClose" />
      <online-users 
        v-if="modals.onlineUsers.visible"
        :color="mainColor"
        :data="onlineList"
        :modalClose="modalClose" />
    </transition> 

    <view-original 
      v-if="modals.viewOriginal.visible"
      :img="modals.viewOriginal.img"
      :modalClose="modalClose" />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import Firebase from '../firebaseHelper'

import PhotoUpload from './modal/PhotoUpload'
import ViewOriginal from './modal/ViewOriginal'
import OnlineUsers from './modal/OnlineUsers'
import ColorPicker from './ColorPicker'

const database = Firebase.database();
const chats = database.ref('chats');
const users = database.ref('users');
const online = database.ref('online');

// for image store
const storageRef = Firebase.storage().ref();

// scroll to bottom
chats.on('child_added', data => {
  setTimeout(() => {
    scrollBottom();
  });
});

const scrollBottom = () => {
  const chatlist = document.querySelector('.chat-list');
  chatlist.scrollTop = chatlist.scrollHeight;
};

const XSSfilter = content => content.replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default {
  name: 'chatpage',
  props: [
    'auth',
  ],
  data() {
    return {
      colorPicker: {
        visible: false,
        data: [
          {
            value: '#673ab7',
            selected: true,
          },
          {
            value: '#ff9800',
            selected: false,
          },
          {
            value: '#03a9f4',
            selected: false,
          },
          {
            value: '#cddc39',
            selected: false,
          },
          {
            value: '#009688',
            selected: false,
          },
          {
            value: '#e91e63',
            selected: false,
          },
          {
            value: '#607d8b',
            selected: false,
          },
          {
            value: '#795548',
            selected: false,
          },
          {
            value: '#ff5722',
            selected: false,
          }
        ]
      },
      showOnline: false,
      newChat: '',
      modals: {
        photoUpload: {
          visible: false
        },
        viewOriginal: {
          visible: false,
          img: ''
        },
        onlineUsers: {
          visible: false,
        }
      }
    }
  },
  firebase: {
    chatList: chats,
    userList: users,
    onlineList: online,
  },
  computed: {
    ...mapState([
      'app'
    ]),
    // lodash
    _() {
      return _;
    },
    myAccount() {
      return this.app.myAccount;
    },
    online() {
      return this.onlineList.length;
    },
    mainColor() {
      return this.colorPicker.data.filter(data => data.selected == true)[0].value;
    }
  },
  methods: {
    sendChat(data) {
      if(data != ''){
        this.pushChat(XSSfilter(data));
        this.newChat = '';
      }
    },
    sendImage(obj){
      if(obj.type == 'file'){
        const file = obj.data;
        const filename = file.name;
        storageRef.child('images/' + filename).put(file).then(snapshot => {
          this.pushChat(`<img src="${snapshot.downloadURL}" />`);
        });        
      } else{
        this.pushChat(`<img src="${obj.data}" />`);
      }
      this.modalClose();
    },
    pushChat(content) {
      chats.push({
        user: this.myAccount.uid,
        content: content,
        time: new Date().toString()
      });
    },    
    modalClose() {
      Object.keys(this.modals).forEach(key => { this.modals[key].visible = false });
    },
    changeMainColor(item) {      
      this.colorPicker.data.forEach(data => {
        data.selected = (data == item ? true : false);
      });
    },
    contentClick(e) {
      // when image Click
      if(e.target.childNodes[0].localName == 'img'){
        this.modals.viewOriginal.img = e.target.childNodes[0].src;
        this.modals.viewOriginal.visible = true;
      }
    }
  },
  components: {
    PhotoUpload,
    ViewOriginal,
    OnlineUsers,
    ColorPicker,
  }
}
</script>

<style>
/* transition css */
.chat-list-enter-active {
  transition: all 0.75s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
.chat-list-enter {
  transform: translateX(-3rem);
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active{
  transition: all 0.75s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.modal-enter .modal-wrapper,
.modal-leave-to .modal-wrapper{
  transform: translate(-50%, -50%) scale(1.2);
}

/* template css */
.chat-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f2f2f2;
  color: #2f2f2f;
}
header {
  position: relative;
  padding: 0 2rem;
  height: 3.5rem;
  color: white;
  box-shadow: 0 5px 10px -5px rgba(0,0,0,.8);
  transition: all 0.3s;
}
header > h3 { 
  position: absolute;      
  left: 50%;    
  top: 50%;  
  transform: translate(-50%, -50%);  
}
header > span > i {
  position: absolute;        
  left: 1.5rem; 
  top: 50%;  
  cursor: pointer;
  transform: translateY(-50%); 
}
header > button {
  position: absolute;      
  right: 1.5rem;    
  top: 50%;  
  transform: translateY(-50%); 
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
.chat.myChat {
  text-align: right;
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
.myChat .info-text,
.myChat .content {
  margin-left: 0.5rem;
}

.username {

}
.time {
  margin-left: 0.5rem;
  font-size: 0.8rem;
  color: gray;  
}
.content {
  display: inline-block;
  padding: 0.6rem 1rem;
  background-color: white;    
  border-radius: 3px;
  color: black;
  font-weight: 300;
  cursor: pointer;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
}
.content > img {
  max-width: 40vw;
  max-height: 40vh;
  padding: 0.3rem 0;
  border-radius: 3px;
  pointer-events: none;
}
.myChat .content {
  background-color: #5775f6;
  color: white;
}
.type-chat {
  position: absolute;
  bottom: 0;
  height: 5rem;
  width: 100%;
  background-color: white;
  box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);
}
.type-chat > input[type="text"] {
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
  position: absolute;
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
.btn {
  display: inline-block;
  padding: 1rem 1.5rem;
  margin: 0 0.2rem;
  background-color: transparent;
  border: none; 
  border-radius: 3px;
  outline: none;
  color: white;
  font-size: 1rem;
  transition: all 0.3s;
}
.btn:nth-of-type(1):hover{
  background-color: rgba(0,0,0, 0.1);
}
.btn:nth-of-type(2):hover{
  border-radius: 3rem;
}

.online-list-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 3.5rem;  
  padding: 0.2rem 0.4rem;    
  z-index: 1;
  background-color: rgba(0,0,0,0.7);
  color: white;  
  cursor: pointer;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
  transform: translateX(-50%);
}
.online-list-btn > span {
  padding: 0 0.2rem;
}
/* modal style */
.modal {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.3);
}   
.modal-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  min-width: 25rem;
  padding: 1.2rem;
  background-color: white;
  border-radius: 3px;
  transform: translate(-50%,-50%);
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  transition: all 0.3s;
}
.modal-header {  
  position: relative;
  padding: 0 0.5rem 1rem 0.5rem;
  border-bottom: 1px solid lightgray;
  font-size: 1.35rem;
}
.close {
  position: absolute;
  right: 0;
  top: 50%;
  color: gray;
  cursor: pointer;
  transform: translateY(-70%);
}

.modal-content {
  padding: 1rem;
}
.modal-footer {
  padding: 1rem 0 0 0;
  border-top: 1px solid lightgray;
  text-align: right;
}
.modal-footer > button {
  padding: 0.65rem 1.2rem;
  background-color: transparent;  
  border: none;
  border-radius: 3px;  
  outline: none;
  font-size: 1rem;
  color: white;
  transition: all 0.3s;
}
.modal-footer > button:nth-of-type(1):hover {
  background-color: rgba(0,0,0,0.1);
}
.modal-footer > button:nth-of-type(2):hover {
  border-radius: 3rem;
}

</style>
