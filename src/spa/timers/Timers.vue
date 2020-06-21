<template>
  <v-flex class="pa-4">
    <v-layout class="justify-end">
      <v-btn class="success" :to="{name: 'createTimer'}" :disabled="timers.length >= 3">Create timer</v-btn>
    </v-layout>
    <span class="grey--text d-block text-end mt-4">{{timers.length}}/3</span>
    <v-divider class="mb-4" />
    <v-row v-if="timers.length">
      <v-col v-for="(timer, index) in timers" :key="timer.startAt" cols="4">
        <timer
          :timer="timer"
          :title="`Timer ${index+1}`"
          @remove="removeTimer(index)" />
      </v-col>
    </v-row>
    <p v-else class="title text-center">
      No timers here...
    </p>
  </v-flex>
</template>

<script>
  import Timer from "../common/timer/Timer";

  export default {
    name: "TimersList",
    components: {Timer},
    computed: {
      timers() {
        return this.$store.state.timers
      }
    },
    methods: {
      removeTimer(index) {
        this.$store.dispatch('removeTimer', index)
      },
    },
  }
</script>

<style scoped>

</style>
