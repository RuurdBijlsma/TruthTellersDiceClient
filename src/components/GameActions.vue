<template>
    <v-card outlined class="game-actions">
        <div class="left-actions">
            <game-config></game-config>
            <div class="buttons">
                <v-btn class="mb-2" text rounded outlined @click="newGame">New game</v-btn>
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
import GameConfig from "@/components/GameConfig";

export default {
    name: "GameActions",
    components: {GameConfig},
    data: () => ({
    }),
    methods: {
        ...mapActions(['newGame']),
    },
    computed: {
        ...mapState({
            socket: state => state.socket,
            rounds: state => state.game.rounds,
        }),
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

.buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}
</style>
