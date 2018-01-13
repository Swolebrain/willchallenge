<template>
  <div>
    <h4 v-if="authenticated">
        You are logged in!
        <feed :auth="auth" ></feed>
    </h4>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
    </h4>
  </div>
</template>

<script>
  import Feed from './Feed'
  export default {
    name: 'home',
    props: ['auth', 'authenticated'],
    components: {
      Feed
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>

