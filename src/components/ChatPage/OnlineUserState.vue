<template>
  <div class="online-list-btn" @click="openModal('onlineUsers')">
      <i class="material-icons">person</i>
      <span>{{data}}</span>
  </div>  
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'onlineUserState',
  props: ['data'],
  methods: {
    ...mapActions('colorpicker', {
      openModal: 'open'
    })
  }  
}
</script>

<style scoped>
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
</style>