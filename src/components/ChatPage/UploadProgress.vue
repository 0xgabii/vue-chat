<template>
  <transition name="upload-progress">
    <div class="upload-progress" v-if="progress !== 0">
      <div class="progress" :style="{width: percent}" />
      <span class="progress-text">{{ progressText }}</span>
    </div>
  </transition>  
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'uploadProgress',
  computed: {
    ...mapState([
      'uploadprogress'
    ]),
    progress() {
      return this.uploadprogress.progress;
    },
    percent() {
      return (75 * this.progress / 100) + '%';
    },
    progressText() {
      return Math.floor(this.progress) + '%';
    }
  }
}
</script>

<style>
.upload-progress-enter-active,
.upload-progress-leave-active {
  transition: all 0.35s;  
}
.upload-progress-enter,
.upload-progress-leave-to {  
  transform: translateY(2rem);
}

.upload-progress {
  position: absolute;
  right: 2rem;
  bottom: 5.5rem;
  width: 15rem;
  height: 1.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 1rem;  
  box-shadow: 0 3px 3px rgba(0,0,0,0.2), 0 3px 3px rgba(0,0,0,0.2);  
}
.progress {  
  position: absolute;
  left: 0.5rem;
  top: 50%;
  height: 0.65rem;
  background-color: #34c43a;
  border-radius: 1rem;
  transform: translateY(-50%);  
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);  
}
.progress-text {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  color: white;
  font-weight: 300;
  font-size: 0.9rem;  
  transform: translateY(-50%);
}
</style>