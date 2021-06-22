<template>
    <div class="home" :style="{
        maxHeight: $vuetify.breakpoint.height - $vuetify.application.top - $vuetify.application.bottom + 'px'
    }">
        <game-actions class="top-pane"/>
        <div class="middle-pane">
            <game-visualization class="left-pane"/>
            <model-visualization class="right-pane"/>
        </div>
        <logic-lines class="bottom-pane"/>
    </div>
</template>

<script>
import GameVisualization from "@/components/GameVisualization";
import ModelVisualization from "@/components/ModelVisualization";
import LogicLines from "@/components/LogicLines";
import io from "socket.io-client";
import Swal from "sweetalert2";
import Round from "@/js/Round";
import {mapActions, mapState} from "vuex";
import GameActions from "@/components/GameActions";

// TODO:
// Add home page
// Add support for choosing strategy
// Add button to reset game
// per round ui:
// add logic lines per round
// add matrices per round nice ui

export default {
    name: 'Home',
    components: {GameActions, LogicLines, ModelVisualization, GameVisualization},
    data: () => ({}),
    beforeDestroy() {
        this.socket.destroy();
        this.$store.commit('socket', null);
    },
    mounted() {
        console.log(`Connecting to ${this.$store.state.url}`);
        this.$store.commit('socket', io(this.$store.state.url));
        let errorShown = false;
        this.socket.on('connect', () => {
            console.log("CONNECT");
        });
        this.socket.on('connect_error', e => {
            console.warn(e.message);
            if (!errorShown) {
                errorShown = true;
                Swal.fire({
                    title: `Can't connect to server, run the TruthTellersDice server before loading this page.`,
                    text: `Server IP ${this.$store.state.url}`,
                    icon: 'error',
                });
            }
        });
        console.log('Server starting:', this.socket);
        this.setSocketListeners();
    },
    methods: {
        setSocketListeners() {
            this.socket.on('connect', () => {
                console.log('send start event')
                this.newGame();
            });
            this.socket.on('game_data', gameData => {
                console.log('received game_data', gameData);
                let nRounds = gameData.dice.length;
                let rounds = [];
                for (let i = 0; i < nRounds; i++) {
                    let round = new Round(
                        gameData.dice[i],
                        gameData.matrices[i],
                        gameData.common_knowledge[i],
                        gameData.players[i],
                        gameData.beliefs[i],
                    );
                    rounds.push(round);
                }
                console.log({rounds, worlds: gameData.worlds});
                this.$store.commit('rounds', rounds);
                this.$store.commit('worlds', gameData.worlds);
            });
            this.socket.on('simulation_data', winners => {
                console.log('received simulation_data', winners);
                this.$store.commit('simulationResults', winners);
            });
        },
        ...mapActions(['newGame']),
    },
    computed: {
        ...mapState({
            rounds: state => state.game.rounds,
            worlds: state => state.game.worlds,
            socket: state => state.socket,
        }),
    },
}
</script>

<style>
.home {
    display: flex;
    flex-direction: column;
}

.top-pane {
    display: flex;
}

.select-round {
    text-align: center;
}

.middle-pane {
    display: flex;
    flex-grow: 1;
}

.left-pane {
    flex-grow: 1;
}

.right-pane {
    flex-grow: 1;
}

.bottom-pane {
}
</style>
