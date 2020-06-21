<template>
  <v-flex xs6>
    <v-card>
      <v-card-title class="primary white--text">Create timer</v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="form">
          <v-text-field
            v-model="endAt"
            v-mask="mask"
            :rules="rules"
            placeholder="yyyy:mm:dd HH:mm:ss"
            label="End time of timer"
            hide-details="auto"
            validate-on-blur>
            <template v-slot:append-outer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" icon v-on="on" @click="setTimeByTimePicker">
                    <v-icon>mdi-timer-outline</v-icon>
                  </v-btn>
                </template>
                <span>Set time by Time Picker</span>
              </v-tooltip>
            </template>
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn color="error" outlined @click="$refs.form.reset()">Reset</v-btn>
        <v-spacer />
        <v-btn color="success" @click="createTimer">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
  import { DateTime } from 'luxon'
  import { VueMaskDirective } from 'v-mask'

  export default {
    name: "CreateTimer",
    directives: { mask: VueMaskDirective },
    data() {
      return {
        endAt: '',
        mask: '####-##-## ##:##:##',
        rules: [
          v => !!v && !!v.length || 'This field is required',
          v => !!v && v.length === this.mask.length || 'The length of the field is less than the length of the mask',
          v => !!v && !DateTime.fromFormat(v, 'yyyy-MM-dd HH:mm:ss').invalid || 'Time is not valid',
          v => !!v && DateTime.fromFormat(v, 'yyyy-MM-dd HH:mm:ss').valueOf() > +new Date() || 'Time cannot be in the past',
        ]
      }
    },
    methods: {
      createTimer() {
        if(this.$store.state.timers.length >= 3) {
          this.$errSnackbar('You cannot create more than 3 timers')
          this.$router.push({name: 'timers'})
          return;
        }


        if(this.$refs.form.validate()) {
          this.$store.dispatch('saveTimer', {
            startAt: +new Date(),
            endAt: DateTime.fromFormat(this.endAt, 'yyyy-MM-dd HH:mm:ss').valueOf(),
          });
          this.endAt = '';

          /* Если устанавливать дату с помощью попапа то при сохранении этой даты поле не будет очищаться. Это связано с "v-mask".
            Этот плагин как-то влияет на компонент v-text-field а именно на его реактивность и при первом записывании значения в поле
            endAt внутри компонтена v-text-field не обновляется состояние, это влияет на очитску этого поля */

          this.$refs.form.reset();
          this.$scsSnackbar('Timer successfully created');
        }
      },
      setTimeByTimePicker() {
        this.$popup({ component: 'time-picker', persistent: false })
          .then(({data: time}) => {
            this.endAt = time;
            console.log(this.endAt);
          })
      }
    }
  }
</script>

<style scoped>

</style>
