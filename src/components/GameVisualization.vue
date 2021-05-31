<template>
    <v-card outlined class="game-vis">
        <v-card-title>
            Game visualisation
        </v-card-title>
        <v-card-text>
            Rolled dice per player: {{ dice }}
        </v-card-text>
        <v-card-actions>
            <v-btn text>Bye</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "GameVisualization",
    computed: {
        ...mapState({
            dice: state => state.game.dice,
        }),
    },
}
</script>

<style scoped>
.game-vis {

}
</style>
