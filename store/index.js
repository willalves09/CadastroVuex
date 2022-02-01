import Vue from 'vue'
import VueMask from 'v-mask'
Vue.use(VueMask)

// export const strict = false

export const state = () => ({
  clients: []
})

export const mutations = {
  saveDados (state, payload) {
    state.clients.push(payload)
  },
  editDados (state, cliente) {
    const newState = []
    state.clients.forEach((client) => {
      if (client.id === cliente.id) {
        newState.push(cliente)
      } else {
        newState.push(client)
      }
    })
  },
  deleteDados (state, id) {
    state.clients = state.clients.filter(client => client.id !== id)
  }
}

export const actions = {
  saveDados (context, payload) {
    context.commit('saveDados', payload)
  },
  deleteDados ({ commit }, id) {
    commit('deleteDados', id)
  }
}
