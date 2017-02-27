<template>
  <div class="modal" :class="{active: modalActive}">
    <div class="backdrop" />
    <div class="modal-wrapper">
      <div class="modal-header">
        <h3>Add Photo</h3>
      </div>
      <div class="modal-content">
      
      </div>
      <div class="modal-footer">
        <button>ok</button>
        <button>cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'photoUpload',
  props: ['modalActive'],
}
</script>

<style scoped>
  
</style>