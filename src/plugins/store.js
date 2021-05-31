import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        url: 'ws://localhost:5000',
        game: {
            nPlayers: 3,
            nDice: 1,
            nDiceSides: 2,
            dice: [],
            worlds: [],
            matrices: [],
        }
    },
    mutations: {
        dice: (state, dice) => state.game.dice = dice,
        worlds: (state, worlds) => state.game.worlds = worlds,
        matrices: (state, matrices) => state.game.matrices = matrices,
    },
    actions: {},
    modules: {}
})
