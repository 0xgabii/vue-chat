<template>
  <div class="type-chat">      
    <input 
      type="text" 
      v-model="newChat" 
      @keyup.enter="sendChat(newChat)"
      placeholder="Say something...">
    <div class="btn-group">
      <button class="btn" @click="openModal('photoUpload')" :style="{color: mainColor}">add photo</button>
      <button class="btn" @click="sendChat(newChat)" :style="{backgroundColor: mainColor}">Send</button>    
    </div>    
  </div> 
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'typeChat',
  
}
</script>

<style scoped>
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
</style>