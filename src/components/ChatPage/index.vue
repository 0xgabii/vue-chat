<template>
  <div class="chat-page">
    <header />    
    <color-picker v-if="colorpicker.visible" />        
    <online-user-state :data="online" />
    <chat-list :data="chatList" />
    <type-chat />    

    <transition name="modal">
      <photo-upload 
        v-if="modals.photoUpload.visible"
        :color="mainColor"      
        :sendImage="sendImage" 
        :close="closeModal" />
      <online-users 
        v-if="modals.onlineUsers.visible"
        :color="mainColor"
        :data="onlineList"
        :close="closeModal" />
    </transition> 

    <view-original 
      v-if="modals.viewOriginal.visible"
      :img="modals.viewOriginal.img"
      :close="closeModal" />

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import Firebase from '../firebaseHelper'

import Header from './Header';
import ColorPicker from './ColorPicker'
import OnlineUserState from './OnlineUserState'
import ChatList from './ChatList'
import TypeChat from './TypeChat'
// modals
import PhotoUpload from '../modal/PhotoUpload'
import ViewOriginal from '../modal/ViewOriginal'
import OnlineUsers from '../modal/OnlineUsers'

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
      newChat: '',
    }
  },
  firebase: {
    chatList: chats,
    userList: users,
    onlineList: online,
  },
  computed: {
    ...mapState([
      'app',
      'colorpicker',
      'modals',
    ]),
    ...mapGetters('colorpicker', {
      mainColor: 'selectedColor'
    }),
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
  },
  methods: {
    ...mapActions('colorpicker', {
      openColorpicker: 'open',
    }),
    ...mapActions('modals', {
      openModal: 'open',
      viewOriginal: 'viewOriginal',
      closeModal: 'close',
    }),
    sendChat(data) {
      if(data != ''){
        this.pushChat(`<div>${XSSfilter(data)}</div>`);
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
      this.closeModal();
    },
    pushChat(content) {
      chats.push({
        user: this.myAccount.uid,
        content: content,
        time: new Date().toString()
      });
    },
    contentClick(e) {
      // when img Click
      if(e.target.childNodes[0].localName == 'img'){
        this.viewOriginal(e.target.childNodes[0].src);
        this.openModal('viewOriginal');
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

<style scoped>
/* template css */
.chat-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f2f2f2;
  color: #2f2f2f;
}
</style>
