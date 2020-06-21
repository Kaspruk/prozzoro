<template>
  <v-dialog
    v-model="dialog"
    :width="params.width"
    :persistent="params.persistent"
    @click:outside="params.persistent || reject()">
    <component
      :is="params.component"
      v-if="showModalComponent"
      v-bind="params.props"
      @reject="reject"
      @success="success">
    </component>
  </v-dialog>
</template>

<script>
  export default {
    name: "Popup",
    components: {
      'time-picker': () => import(/* webpackChunkName: "popup-time-picker" */ './components/TimePicker'),
    },
    data: () => ({
      dialog: false,
      showModalComponent: false,
      defaultParams: {
        component: '',
        width: 600,
        persistent: false,
        props: {},
      },
      params: {
        component: '',
        width: 600,
        persistent: false,
        props: {},
      }
    }),
    methods: {
      success(params) {
        this.$eBus.$emit(this.params.component, {success: true, data: params});
        this.hidePopup();
      },
      reject(params) {
        this.$eBus.$emit(this.params.component, {success: false, data: params});
        this.hidePopup();
      },
      hidePopup() {
        this.dialog = false;
        const setVisibleDialogTimeout = setTimeout(() => {
          this.showModalComponent = false;
          this.params = Object.assign({}, this.defaultParams);
          clearInterval(setVisibleDialogTimeout);
        }, 500);
      },
    },
    mounted() {
      this.$eBus.$on('open-popup', (popupParams) => {
        Object.assign(this.params, popupParams);
        this.showModalComponent = true;
        this.dialog = true;
      })
    }
  }
</script>
