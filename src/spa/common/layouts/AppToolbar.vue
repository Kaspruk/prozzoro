<template>
  <v-app-bar color="primary" clipped-left app dark>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="ml-4">
      <span>Timers</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
  export default {
    name: "AppToolbar",
    methods: {
      toggleDrawer() {
        this.$store.commit('setDrawerOpen', !this.$store.state.isDrawerOpen)
      }
    }
  }
</script>

<style scoped>

</style>
