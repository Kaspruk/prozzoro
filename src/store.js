import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDrawerOpen: true,
    timers: [],
  },
  mutations: {
    setDrawerOpen: (state, payload) => state.isDrawerOpen = payload,
    setTimers: (state, payload) => state.timers = payload,
  },
  actions: {
    saveTimer: ({state}, payload) => {
      state.timers.push(payload);
      localStorage.setItem('timers', JSON.stringify(state.timers))
    },
    removeTimer: ({state}, payload) => {
      state.timers.splice(payload, 1)
      if(state.timers.length) localStorage.setItem('timers', JSON.stringify(state.timers))
      else localStorage.removeItem('timers')
    },
  }
})
