<template>
  <transition name="color-picker">
    <div class="colorPicker" ref="refDOM">
      <div 
      class="color" 
      v-for="item in colorArray"        
      :class="{active: item.selected}"
      :style="{backgroundColor: item.value}"
      @click="changeColor(item)" />
    </div>
  </transition> 
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'colorPicker',
  mounted() {      
    window.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleClickOutside);
  },
  computed:{
    ...mapState([
      'colorpicker'
    ]),
    colorArray() {
      return this.colorpicker.data;
    }
  }, 
  methods: {
    ...mapActions('colorpicker',[
      'changeColor',
      'close'
    ]),
    handleClickOutside(e) {
      if(!this.$refs.refDOM.contains(e.target) 
          && e.target.className != 'material-icons'){
        this.close();
      }        
    }
  }
}
</script>

<style scoped>
.color-picker-enter-active,
.color-picker-leave-active {
  transform-origin: 0 0;
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);  
}
.color-picker-enter,
.color-picker-leave-to {
  opacity: 0;
  transform: scale(0);
}

.colorPicker {
  position: absolute;
  left: 1rem;
  top: 1rem;
  padding: 0.75rem;
  width: 15rem;
  z-index: 2;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
}
.color {
  display: inline-block;
  margin: 0.35rem;
  width: 2rem;
  height: 2rem;  
  border-radius: 100%;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
}
.color.active {
  animation: selected 0.35s infinite;
}

@keyframes selected {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>