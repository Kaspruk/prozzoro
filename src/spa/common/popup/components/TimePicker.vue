<template>
  <v-card class="time-picker">
    <v-card-text class="px-0 pb-0">
      <v-layout>
        <v-date-picker
          v-model="datePicker"
          :min="minDate" />
        <v-time-picker
          v-model="timePicker"
          :min="minTime"
          format="24hr"
          use-seconds />
      </v-layout>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn color="error" outlined @click="$emit('reject')">Close</v-btn>
      <v-spacer />
      <v-btn color="success" @click="setTime">Create</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { DateTime } from 'luxon'

  export default {
    name: "TimePicker",
    data() {
      return {
        datePicker: '',
        timePicker: '',
        minDate: '',
        minTime: '',
      }
    },
    methods: {
      setTime() {
        this.$emit('success', `${this.datePicker} ${this.timePicker}`)
      },
      getCurrentTime() {
        const localTime = DateTime.local();
        this.minDate = localTime.toFormat('yyyy-MM-dd');
        this.minTime = localTime.toFormat('HH:mm:ss');

        if(this.datePicker<this.minDate) this.datePicker=this.minDate;
        if(this.timePicker<this.minTime) this.timePicker=this.minTime;

        setTimeout(() => this.getCurrentTime(), 1000);
      }
    },
    created() {
      this.getCurrentTime();
    },
  }
</script>
