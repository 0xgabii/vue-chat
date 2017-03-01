<template> 
  <div class="onlineUsers">
    <div class="user" v-for="item in data">
      <img :src="item.picture">
      <span>{{item.username}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'onlineusers',
    props: ['data'],
  }
</script>

<style scoped>
.onlineUsers {
  position: absolute;
  left: 2rem;
  top: 2rem;
  padding: 0.5rem;
  background-color: lightgray;
  border-radius: 3rem;
}
.user{
  display: flex;
  padding: 0.5rem;
  background-color: white;
  border-radius: 3rem;
}
.user > img{
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
}
.user > span{
  padding: 0.25rem;
}
</style>