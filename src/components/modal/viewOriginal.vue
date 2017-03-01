<template>
  <transition name="view">
    <div class="viewOriginal">
      <img :src="img" @click="modalClose" alt="originalImage">
    </div>
  </transition>
</template>

<script>
export default {
  name: 'vieworiginal',
  props: [
    'img',
    'modalClose'
  ],
}
</script>

<style scoped>
.view-enter-active,
.view-leave-active{
  transition: all 0.5s ease;
}

.view-enter,
.view-leave-to{
  opacity: 0;
}

.view-enter img,
.view-leave-to img{
  transform: translate(-50%, -50%) scale(0.7);
}

.viewOriginal{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0,0,0,0.75);
}
img{
  position: absolute;
  left: 50%;
  top: 50%;
  max-width: 100vw;
  max-height: 100vh;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}
</style>