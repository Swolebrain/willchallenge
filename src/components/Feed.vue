<template>
  <div class="main-page">
    <div class="top-bar">
      <div class="top-bar__badge">
        <h1>Start a Challenge</h1>
      </div>
      <div class="top-bar__badge">
        <h1>Join a Challenge</h1>
      </div>
    </div>
    <div class="feed">
        <div class="challenge" v-for="(challenge, index) in challenges">
          <div class="challenge__description">
            {{ challenge.description || "Challenge Description Missing" }}
          </div>
          <div class="challenge__bottom-line">
            <div class="challenge__owner">
              By: {{challenge.owner}}
            </div>
            <div class="challenge__subscribers">
              Subscribers: {{ challenge.subscribers.length }}
            </div>
          </div>
        </div>
    </div>
  </div>

</template>

<script>
  import challengeClient from '../network/ChallengeClient';

  export default {
    name: 'feed',
    props: ['auth'],
    data () {
      return {
        challenges: []
      }
    },
    created () {
      this.loadFeed();
    },
    methods: {
      async loadFeed () {
        console.log('loading feed...');
        const challenges = await challengeClient.loadAllChallenges(this.auth)
        this.challenges = challenges;
      }
    }
  }
</script>

<style>
  .main-page{

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
  }
</style>
