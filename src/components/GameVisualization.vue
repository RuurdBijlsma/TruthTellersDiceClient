<template>
    <v-card outlined class="game-vis">
        <v-card-title>
            Game visualisation
        </v-card-title>
        <v-card-text v-if="round">
            Players: {{ round.players }}
            <br>
            Rolled dice per player: {{ round.dice }}
            <br>
            Common knowledge {{ round.commonKnowledge }}
            <br>
            Bids done this round: data not yet available
            <div v-if="simulationResults">
                Latest simulation results: {{simulationResults}}
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
    name: "GameVisualization",
    computed: {
        ...mapGetters(['round']),
        ...mapState({
            simulationResults: state=>state.simulationResults,
        }),
    },
}
</script>

<style scoped>
.game-vis {

}
</style>
