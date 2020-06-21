<template>
  <v-app id="inspire">
    <app-sidebar />
    <app-toolbar />
    <v-main>
      <v-container class="fill-height" fluid>
        <v-layout class="justify-center">
          <transition name="fade-transition" mode="out-in">
            <router-view :key="$route.name"/>
          </transition>
        </v-layout>
      </v-container>
    </v-main>
    <popup />
    <snack-bar />
  </v-app>
</template>

<script>
  import AppSidebar from "./spa/common/layouts/AppSidebar";
  import AppToolbar from "./spa/common/layouts/AppToolbar";
  import Popup from './spa/common/popup/Popup'
  import SnackBar from "./spa/common/snackBar/SnackBar";

  export default {
    name: 'app',
    components: {AppSidebar, AppToolbar, Popup, SnackBar},
    methods: {
      getTimers() {
        let timers = localStorage.getItem('timers')
        if(timers) {
          timers = JSON.parse(timers);
          if(timers.length) this.$store.commit('setTimers', timers)
        }
      },
    },
    created() {
      this.getTimers();
    }
  }
</script>
