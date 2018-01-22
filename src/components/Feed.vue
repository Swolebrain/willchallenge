<template>
  <div class="main-page">
    <slot name="top-bar"></slot>
    <div class="feed">
      <div class="loader" v-if="!challenges">
        <RingLoader  />
      </div>
      <div class="loader" v-if="challenges && challenges.length === 0">
        <h4>- no results -</h4>
      </div>
      <div class="challenge" v-for="(challenge, index) in challenges" :key="challenge._id">
        <h2 class="challenge__description">
          {{ challenge.description || "Challenge Description Missing" }}
        </h2>
        <div class="challenge__bottom-line">
          <h3 class="challenge__owner">
            By: 
            <img :src="challenge.ownerPicture"/>
            {{challenge.ownerName}}
          </h3>
          <div class="challenge__subscribers">
            <div @click="subscribeTo(challenge._id)">+ Join</div>
            <div>Subscribers: {{ challenge.subscribers.length }} </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import challengeClient from '../network/ChallengeClient';
  import RingLoader from 'vue-spinner/src/RingLoader.vue';

  export default {
    name: 'feed',
    props: ['auth', 'challenges'],
    components: {
      RingLoader: RingLoader
    },
    methods: {
      subscribeTo (id) {
        this.$emit('subscribeToChallenge', id);
      }
    },
    async created () {
      const challenges = await challengeClient.loadAllChallenges(this.auth);
      console.log('challenges loaded from api', challenges);
      this.$emit('loadChallenges', challenges);
    }
  }
</script>

<style>
  .loader{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }
  .top-bar{
    display: flex;
  }
  .top-bar__badge{
    flex:1;
  }
  .challenge {
    text-align: center;
    box-shadow: 0 1px 3px #333;
    margin: 3rem;
    padding: 2rem;
  }
  .challenge__bottom-line {
    display: flex;
  }
  .challenge__subscribers {
    text-align: right;
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>
