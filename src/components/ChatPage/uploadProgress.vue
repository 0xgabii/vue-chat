<template>
  <div class="upload-progress">
    <div class="progress" :style="{width: '75%'}" />
    <span class="progress-text">100%</span>
  </div>
</template>

<script>
export default {
  name: 'uploadProgress'
}
</script>

<style>
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