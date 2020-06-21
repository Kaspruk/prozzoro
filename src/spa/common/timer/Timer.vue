<template>
  <v-card>
    <v-card-title class="justify-space-between" :class="currentColor" dark>
      <span class="white--text">{{ title }}</span>
      <v-btn icon color="white" @click="$emit('remove')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <span class="d-block subtitle-1">Start at: <span class="subtitle-2 black--text">{{ timer.startAt | dateFormat }}</span></span>
      <span class="d-block subtitle-1">End at: <span class="subtitle-2 black--text"> {{ timer.endAt | dateFormat }}</span></span>
      <span class="d-block subtitle-1">Time left: <span class="subtitle-2" :class="`${currentColor}--text`">{{ timeLeft }}</span></span>
    </v-card-text>
  </v-card>
</template>

<script>
  import { DateTime } from 'luxon';

  export default {
    name: "Timer",
    props: {
      timer: {type: Object, required: true},
      title: {type: String, default: null}
    },
    data() {
      return {
        timeLeft: '',
        status: '',
      }
    },
    computed: {
      currentColor() {
        return this.status && this.status === 'end' ? 'black' : this.status === 'almostUp' ? 'red' : 'primary'
      }
    },
    methods: {
      calcTimeLeft() {
        const start = DateTime.local();
        const {hours, minutes, seconds} = DateTime.fromMillis(this.timer.endAt).diff(start, ['hours', 'minutes', 'seconds']).toObject();

        if(hours === 0 && minutes<5) this.status = 'almostUp'

        this.timeLeft = `${this.getFormatTime(hours)}:${this.getFormatTime(minutes)}:${this.getFormatTime(Math.floor(seconds))}`

        if(hours>0 || minutes>0 || seconds>0) setTimeout(() => this.calcTimeLeft(), 1000)
        else this.status = 'end'
      },
      getFormatTime(value) {
        return `${value<0 ? '00' : value<10 ? `0${value}` : value}`
      }
    },
    created() {
      this.calcTimeLeft()
    }
  }
</script>

<style scoped>

</style>
