<template>
  <div class="modal" :class="{active: modalActive}">
    <div class="modal-wrapper">
      <div class="modal-header">
        <h3>Add Photo</h3>        
        <span class="close" @click="modalClose"><i class="material-icons">close</i></span>
      </div>
      <div class="modal-content">                

        <div class="box" @click="openFile" v-if="thumbnail == ''">
          <i class="material-icons">insert_drive_file</i>
          <span>local file</span>          
        </div>
        <div class="box" v-if="thumbnail == ''">
          <i class="material-icons">link</i>
          <span>photo url</span>
        </div>

        <input type="file" id="file" @change="localFileSend">
        
        <transition name="thumbnail">
          <div class="thumbnail" v-if="thumbnail != ''">
            <img :src="thumbnail">     
          </div>
        </transition>

      </div>
      <div class="modal-footer">
        <button @click="modalClose" :style="{color: color}">cancel</button>
        <button @click="photoUpload" :style="{backgroundColor: color}">Send</button>
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
  data() {
    return {
      photo: {
        type: '',
        data: '',
      },
      thumbnail: '',
    }
  },
  methods: {
    openFile() {
      document.getElementById('file').click();
    },
    localFileSend(e) {
      const file = e.target.files[0];
      const fileType = file.type;

      if(fileType != 'image/jpeg' && fileType != 'image/gif' && fileType != 'image/png'){
        alert('photo only!');
        e.target.value = '';
        return;
      }

      this.thumbnail = URL.createObjectURL(file);            
      this.photo = {
        type: 'file',
        data: file
      }

      e.target.value = '';     
    },
    photoUpload() {
      this.sendImage(this.photo);
    }
  }
}
</script>

<style scoped>
.thumbnail-enter-active{
  transition: all 0.5s;
}
.thumbnail-enter{
  opacity: 0;
}

.modal-content{
  display: flex;
  justify-content: space-around;
  text-align: center;
  transition: all 0.3s;
}
.modal-content .box{
  padding: 1.75rem 2rem;
  border-radius: 1rem;  
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  cursor: pointer;
}
.modal-content .box:hover {
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.modal-content i {
  display: block;
  margin-bottom: 0.5rem;
}
.modal-content span {
  font-size: 1.1rem;  
}
.thumbnail {
  width: 100%;    
}
.thumbnail > img{
  max-width: 100%;
  max-height: 50vh;
}
</style>