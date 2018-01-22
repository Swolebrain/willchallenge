<template>
  <div class="full-screen" @click="clickHandler">
    <div class="modal-container">
      <slot>
        modal empty
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FullScreenModal',
    methods: {
      clickHandler (e) {
        if (e.target.classList.contains('full-screen')) {
          this.$emit('toggleModal');
        }
      }
    }
  }
</script>

<style>
  .full-screen{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    overflow-y: hidden;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>