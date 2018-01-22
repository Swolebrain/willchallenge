<template>
  <div class="modal__inner-container">
    <h1>Create Challenge</h1>
    <div class="modal__input-row">
      <label for="challenge-name">Challenge Name:</label>
      <input v-model="challengeName" class="modal__input" @keypress="handleEnter" />
    </div>
    <button class="modal__btn" @click="handleClick">Create Challenge</button>
  </div>
</template>

<script>
  
  export default {
    name: 'CreateChallenge',
    data () {
      return {
        challengeName: ''
      }
    },
    methods: {
      handleClick () {
        this.$emit('createChallenge', this.challengeName)
      },
      handleEnter (e) {
        if (e.keyCode === 13) this.handleClick();
      }
    }
  }
</script>

<style>
  .modal__inner-container {
    padding: 10vw;
    background-color: white;
    box-shadow: 0 2px 8px 2px #333;
    display: flex;
    flex-direction: column;
  }
  .modal__input-row {
    margin-top: 2rem;
  }
  .modal__input {
    box-shadow: none;
    border: none;
    border-bottom: 1px solid #333;
  }
  .modal__input:focus {
    outline-width: 0;
  }
  .modal__btn {
    align-self: center;
    margin: 2rem;
    margin-top:4rem;
    margin-bottom: 0;
    padding: 1rem;
  }
</style>