<template>
    <v-card outlined class="game-actions">
        <div class="left-actions">
            <div class="selectors">
                <v-select hide-details v-model="strategy" dense class="selector" :items="strategyItems"
                          label="Strategy"/>
                <v-select hide-details v-model="nPlayers" dense class="selector" :items="playersItems"
                          label="# Players"/>
            </div>
            <div class="selectors">
                <v-select hide-details v-model="nDice" dense class="selector" :items="diceItems" label="# Dice"/>
                <v-select hide-details v-model="nDiceSides" dense class="selector" :items="sidesItems"
                          label="# Dice sides"/>
            </div>
            <div class="buttons">
                <v-btn class="mb-2" text rounded outlined @click="newGame">New game</v-btn>
                <v-btn :loading="loadingSimulation" text rounded outlined @click="promptSimulateGames">Simulate
                    games
                </v-btn>
            </div>
        </div>

        <v-divider vertical/>

        <div class="select-round">
            <span>View round</span>
            <v-chip-group mandatory v-model="viewedRound" active-class="primary--text">
                <v-chip outlined :key="i - 1" v-for="i in rounds.length">
                    {{ i }}
                </v-chip>
            </v-chip-group>
        </div>
    </v-card>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "GameActions",
    data: () => ({
        strategyItems: ['random', 'first', 'last'],
        playersItems: [2, 3, 4],
        diceItems: [1, 2, 3, 4],
        sidesItems: [2, 3, 4, 5, 6],
        loadingSimulation: false,
    }),
    methods: {
        promptSimulateGames() {
            this.loadingSimulation = true;
            this.simulateGames(+prompt('How many iterations?', '100'));
        },
        ...mapActions(['newGame', 'simulateGames']),
    },
    computed: {
        ...mapState({
            socket: state => state.socket,
            rounds: state => state.game.rounds,
            simulationResults: state => state.simulationResults,
        }),
        strategy: {
            get() {
                return this.$store.state.game.strategy;
            },
            set(v) {
                this.$store.commit('strategy', v);
            },
        },
        nPlayers: {
            get() {
                return this.$store.state.game.nPlayers;
            },
            set(v) {
                this.$store.commit('nPlayers', v);
            },
        },
        nDice: {
            get() {
                return this.$store.state.game.nDice;
            },
            set(v) {
                this.$store.commit('nDice', v);
            },
        },
        nDiceSides: {
            get() {
                return this.$store.state.game.nDiceSides;
            },
            set(v) {
                this.$store.commit('nDiceSides', v);
            },
        },
        viewedRound: {
            get() {
                return this.$store.state.viewedRound;
            },
            set(v) {
                this.$store.commit('viewedRound', v);
            },
        },
    },
    watch: {
        simulationResults() {
            this.loadingSimulation = false;
        },
    }
}
</script>

<style scoped>
.game-actions {
    padding: 10px;
    justify-content: space-evenly;
}

.left-actions {
    display: flex;
    justify-content: center;
    flex-direction: row;
}

.selectors {
    display: flex;
    width: 100px;
    margin-top: 5px;
    flex-direction: column;
    margin-right: 20px;
}

.selector {
    width: 100px;
    margin-bottom: 15px;
}

.selector:last-child {
    margin-bottom: 0;
}

.buttons {
    display: flex;
    flex-direction: column;
}
</style>
