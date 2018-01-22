<template>
  <div>
    <!-- main page -->
    <div v-if="authenticated">
        <feed
          @loadChallenges="loadChallenges($event)"
          @subscribeToChallenge="subscribeToChallenge($event)"
          :auth="auth" 
          :challenges="challenges">
          <div class="top-bar" slot="top-bar">
            <div class="top-bar__badge" @click="toggleModal">
              <h1>Start a Challenge</h1>
            </div>
            <div class="top-bar__badge">
              <h1>Join a Challenge</h1>
            </div>
          </div>
        </feed>
    </div>
    <!-- not authenticated message -->
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
    </h4>

    <!--  -->
    <full-screen-modal v-if="auth && modalVisible" @toggleModal="toggleModal">
      <create-challenge :auth="auth" @createChallenge="createChallenge($event)" />
    </full-screen-modal>
  </div>
</template>

<script>
  import Feed from './Feed';
  import FullScreenModal from './FullScreenModal';
  import CreateChallenge from './CreateChallenge';
  import challengeClient from '../network/ChallengeClient';

  export default {
    name: 'home',
    props: ['auth', 'authenticated'],
    components: {
      Feed,
      FullScreenModal,
      CreateChallenge
    },
    data () {
      return {
        challenges: [],
        modalVisible: false
      };
    },
    methods: {
      loadChallenges (challenges) {
        this.challenges = challenges;
      },
      toggleModal () {
        this.modalVisible = !this.modalVisible;
      },
      createChallenge (name) {
        challengeClient.createChallenge(name, this.auth)
          .then(() => this.loadFeed() && this.toggleModal());
      },
      async loadFeed () {
        console.log('loading feed...');
        const challenges = await challengeClient.loadAllChallenges(this.auth);
        console.log('challenges loaded from api', challenges);
        this.challenges = challenges;
      },
      async subscribeToChallenge (id) {
        challengeClient.subscribeToChallenge(id, this.auth)
          .then(() => this.loadFeed());
      }
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>

