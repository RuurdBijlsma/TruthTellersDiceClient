<template>
    <div class="simulation" :style="{
        maxHeight: $vuetify.breakpoint.height - $vuetify.application.top - $vuetify.application.bottom + 'px'
    }">
        <h1>Simulate</h1>
        <game-config class="mb-3"></game-config>
        <v-btn @click="promptSimulateGames">Simulate</v-btn>
        <pre>{{ simulationResults }}</pre>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import GameConfig from "@/components/GameConfig";
import io from "socket.io-client";
import Swal from "sweetalert2";

export default {
    name: "Simulate",
    components: {GameConfig},
    data: () => ({
        loadingSimulation: false,
    }),
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
        promptSimulateGames() {
            this.loadingSimulation = true;
            this.simulateGames(+prompt('How many iterations?', '100'));
        },
        setSocketListeners() {
            this.socket.on('simulation_data', winners => {
                console.log('received simulation_data', winners);
                this.$store.commit('simulationResults', winners);
            });
        },
        ...mapActions(['simulateGames']),
    },
    computed: {
        ...mapState({
            socket: state => state.socket,
            simulationResults: state => state.simulationResults,
        }),
    },
    watch: {
        simulationResults() {
            this.loadingSimulation = false;
        },
    }
}
</script>

<style scoped>
.simulation {
    padding: 30px;
}
</style>
