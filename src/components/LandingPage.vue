<template>
  <div class="landing-page">
    <h1>{{landMsg}}</h1>
    <button @click="auth">{{landingBtnMsg}}</button>
  </div>
</template>

<script>
  export default {
    name: 'landingPage',
    props: ['auth'],
    data() {
      return {
        landMsg: 'Vue-Chat with Goolge Firebase',
        landingBtnMsg: 'Start Chat!'
      }
    }
  }
</script>

<style scoped>
.landing-page {
  width: 100vw;
  height: 100vh;
  background-color: #673ab7;
  color: white;
  overflow: hidden;
}
button {
  padding: 0.7rem 1.3rem;
  background-color: #f44336;
  border: none;
  outline: none;
  color: white;
  font-size: 1.5rem; 
}
</style>