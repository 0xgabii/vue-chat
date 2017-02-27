<template>
  <div class="modal" :class="{active: modalActive}">
    <div class="modal-wrapper">
      <div class="modal-header">
        <h3>Add Photo</h3>        
        <span class="close" @click="modalClose"><i class="material-icons">close</i></span>
      </div>
      <div class="modal-content">                
        <div @click="openFile">
          <i class="material-icons">insert_drive_file</i>
          <span>local file</span>          
        </div>
        <div>
          <i class="material-icons">link</i>
          <span>photo url</span>          
        </div>
        <input type="file" id="file" @change="sendImage">
      </div>
      <div class="modal-footer">
        <button @click="modalClose" :style="{color: color}">cancel</button>
        <button @click="modalClose" :style="{backgroundColor: color}">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'photoupload',
  props: [
    'modalActive',
    'modalClose',
    'sendImage',
    'color',
  ],
  methods: {
    openFile() {
      document.getElementById('file').click();
    },
  }
}
</script>

<style scoped>
.modal-content{
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.modal-content > div{
  padding: 1.75rem 2rem;
  border-radius: 1rem;  
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  cursor: pointer;
  transition: all 0.3s;
}
.modal-content > div:hover {
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.modal-content > div > i {
  display: block;
  margin-bottom: 0.5rem;
}
.modal-content > div > span {
  font-size: 1.1rem;  
}
</style>