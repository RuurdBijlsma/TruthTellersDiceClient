import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        url: 'ws://localhost:5000',
        game: {
            strategy: 'Random',
            nPlayers: 3,
            nDice: 2,
            nDiceSides: 2,
            rounds: [],
        },
        socket: null,
        viewedRound: 0,
        viewedStep: 0,
        simulationResults:null,
    },
    mutations: {
        strategy: (state, strategy) => state.game.strategy = strategy,
        nPlayers: (state, nPlayers) => state.game.nPlayers = nPlayers,
        nDice: (state, nDice) => state.game.nDice = nDice,
        nDiceSides: (state, nDiceSides) => state.game.nDiceSides = nDiceSides,
        rounds: (state, rounds) => state.game.rounds = rounds,

        simulationResults: (state, simulationResults) => state.simulationResults = simulationResults,
        viewedRound: (state, viewedRound) => state.viewedRound = viewedRound,
        socket: (state, socket) => state.socket = socket,
        viewedStep: (state, viewedStep) => state.viewedStep = viewedStep,
    },
    getters: {
        round: state => state.game.rounds[state.viewedRound],
    },
    actions: {
        async newGame({state}) {
            let players = state.game.nPlayers;
            let dice = state.game.nDice;
            let sides = state.game.nDiceSides;
            let strategy = state.game.strategy;
            console.log('start game with', {players, dice, sides, strategy});
            state.socket.emit('start_game', players, dice, sides, strategy);
        },
        async simulateGames({state}, iterations = 100) {
            let players = state.game.nPlayers;
            let dice = state.game.nDice;
            let sides = state.game.nDiceSides;
            let strategy = state.game.strategy;
            console.log('simulate game with', {players, dice, sides, strategy, iterations});
            state.socket.emit('simulate_games', players, dice, sides, strategy, iterations);
        },
    },
    modules: {},
})
