<template>
    <div class="home">
        <div class="top-pane">
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

// TODO:
// Add home page
// Add support for choosing strategy
// Add button to reset game
// per round ui:
// add logic lines per round
// add matrices per round nice ui

export default {
    name: 'Home',
    components: {LogicLines, ModelVisualization, GameVisualization},
    data:()=>({

    }),
    beforeDestroy() {
        this.socket.destroy();
    },
    mounted() {
        console.log(`Connecting to ${this.$store.state.url}`);
        this.socket = io(this.$store.state.url);
        let errorShown = false;
        this.socket.on('connect', () => {
            console.log("CONNECT");
            this.serverConnecting = false;
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
                let players = this.$store.state.game.nPlayers;
                let dice = this.$store.state.game.nDice;
                let sides = this.$store.state.game.nDiceSides;
                this.socket.emit('start_game', players, dice, sides);
            });
            this.socket.on('connection_matrices', matrices => {
                console.log('receive connection_matrix')
                console.log(matrices);
                this.$store.commit('matrices', matrices);
            });
            this.socket.on('dice', dice => {
                console.log('receive dice')
                console.log(dice);
                this.$store.commit('dice', dice);
            });
            this.socket.on('worlds', worlds => {
                console.log('receive worlds')
                console.log(worlds);
                this.$store.commit('worlds', worlds);
            });
            this.socket.on('logic_lines', lines => {
                console.log('receive logic_lines')
                console.log(lines);
                this.$store.commit('logicLines', lines);
            });
        }
    }
}
</script>

<style>
.home {
    max-width: 100%;
    min-width: 100%;
    max-height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
}

.top-pane {
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
