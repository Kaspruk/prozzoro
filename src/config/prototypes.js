export default (Vue) => {

  Vue.prototype.$eBus = new Vue()

  Vue.prototype.$popup = (popupParams) => {
    return new Promise((resolve, reject) => {
      Vue.prototype.$eBus.$emit('open-popup', popupParams)
      Vue.prototype.$eBus.$on(popupParams.component, (result) => {
        Vue.prototype.$eBus.$off(popupParams.component);
        if(!result.success && popupParams.returnReject) reject(result)
        if(result.success) resolve(result)
      })
    })
  }

  Vue.prototype.$scsSnackbar = (message) => Vue.prototype.$eBus.$emit('open-snackbar', { type: 'success', message: message });

  Vue.prototype.$errSnackbar = (message) => Vue.prototype.$eBus.$emit('open-snackbar', { type: 'error', message: message });

  Vue.prototype.$wrnSnackbar = (message) => Vue.prototype.$eBus.$emit('open-snackbar', { type: 'warning', message: message });

}
