<template>
  <v-snackbar v-model="snackbar" :color="color" top>
    <v-layout class="justify-space-between align-center">
      <span class="body-2">{{ message }}</span>
      <v-spacer />
      <v-btn color="white" icon @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-layout>
  </v-snackbar>
</template>

<script>
  export default {
    name: "SnackBar",
    data() {
      return {
        snackbar: false,
        color: '',
        message: '',
        timeout: null,
      }
    },
    mounted() {
      this.$eBus.$on('open-snackbar', ({type, message}) => {
        this.snackbar = false;
        this.color = type;
        this.message = message;
        this.snackbar = true;

        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }

        this.timeout = setTimeout(() => {
          this.snackbar = false;
          clearTimeout(this.timeout);
          this.timeout = null;
        }, 4000);
      })
    }
  }
</script>
