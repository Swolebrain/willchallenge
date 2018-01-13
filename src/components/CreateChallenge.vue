<template>
  <div v-if="authenticated">
    <h1>Create Challenge</h1>
    <div>
      <label for="challenge-name">Challenge Name:</label>
      <input v-model="challengeName" id="challenge-name"/>
    </div>
    <button @click="handleClick">Create Challenge</button>
  </div>
</template>

<script>
  import challengeClient from '../network/ChallengeClient';
  export default {
    name: 'CreateChallenge',
    props: ['auth', 'authenticated'],
    data () {
      return {
        challengeName: ''
      }
    },
    methods: {
      handleClick () {
        challengeClient.createChallenge(this.challengeName, this.auth);
      }
    }
  }
</script>

<style>

</style>