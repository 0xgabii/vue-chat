<template>
  <div class="modal">
    <div class="modal-wrapper">
      <div class="modal-header">
        <h3>Online Users</h3>        
        <span class="close" @click="modalClose"><i class="material-icons">close</i></span>
      </div>
      <div class="modal-content">                
        <div class="user" v-for="item in data" :style="{backgroundColor: color}">
          <img :src="item.picture">
          <span>{{item.username}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'onlineusers',
    props: [
      'data',
      'color',
      'modalClose'
    ],    
  }
</script>

<style scoped>
.user {
  display: inline-block;
  position: relative;  
  margin: 0.3rem;
  border-radius: 3rem;
  color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
}
.user > img{
  position: absolute;
  left: 0.5rem;
  top:50%;  
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  transform: translateY(-50%);
}
.user > span{
  display: block;
  margin-left: 2rem;
  padding: 0.7rem 1rem;
}
</style>