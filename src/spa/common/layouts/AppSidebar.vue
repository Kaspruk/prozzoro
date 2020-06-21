<template>
  <v-navigation-drawer v-model="drawer" clipped fixed app>
    <v-list dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mb-4" />
      <v-list-item key="home" :to="{name: 'home'}" active-class="primary--text" exact>
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Home page</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item key="timers" :to="{name: 'timers'}" active-class="primary--text" exact>
        <v-list-item-action>
          <v-icon>mdi-av-timer</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Timers</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: "AppSidebar",
    computed: {
      drawer: {
        get() {
          return this.$store.state.isDrawerOpen;
        },
        set(value) {
          this.$store.commit('setDrawerOpen', value)
        }
      }
    }
  }
</script>

