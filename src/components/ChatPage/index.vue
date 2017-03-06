<template>
  <div class="chat-page">
    <chat-page-header />    
    
    <color-picker v-if="colorpicker.visible" />     

    <online-user-state :data="online" />

    <chat-list :data="chatList" />

    <type-chat :sendChat="sendChat" />

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
import siiimpleToast from 'siiimple-toast'
import Firebase from '../../firebaseHelper'

import ChatPageHeader from './Header';
import ColorPicker from './ColorPicker'
import OnlineUserState from './OnlineUserState'
import ChatList from './ChatList'
import TypeChat from './TypeChat'
// modals
import PhotoUpload from '../modal/PhotoUpload'
import ViewOriginal from '../modal/ViewOriginal'
import OnlineUsers from '../modal/OnlineUsers'

// toast
const toast = new siiimpleToast();

// firebase
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
        const uploadTask = storageRef.child('images/' + filename).put(file);          
        // show progress
        uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case Firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case Firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, error => {
          switch (error.code) {
            case 'storage/unauthorized':
              toast.alert('User doesn\'t have permission to access the object');
              break;
            case 'storage/canceled':
              toast.message('User canceled the upload');
              break;
            case 'storage/unknown':
              toast.alert('Unknown error occurred, inspect error.serverResponse');        
              break;
          }
        // if success
        }, () => {          
          this.pushChat(`<img src="${uploadTask.snapshot.downloadURL}" />`);
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
  },
  components: {
    ChatPageHeader,
    ColorPicker,
    OnlineUserState,
    ChatList,
    TypeChat,
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
