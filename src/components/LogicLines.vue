<template>
    <v-card outlined class="logic-lines">
        <v-card-title>
            Round steps
        </v-card-title>
        <v-card-text>
            <v-sheet rounded class="mb-2 line-sheet" v-for="(formula, i) in formulas" :key="i"
                     :color="viewedStep === i ? 'primary' : 'default'">
                <span class="line-number font-weight-bold mr-3">{{ i + 1 }}</span>
                <span class="line-number mr-5" v-if="i === 0">Initial: </span>
                <span class="line-number mr-5" v-else-if="i === 1">Look at dice: </span>
                <span class="line-number mr-5" v-else>Player {{
                        round.players[(i - 2) % round.players.length].index + 1
                    }} bids: <span class="monospace">({{ round.bids[i].join(' * ') }})</span></span>
                <vue-mathjax v-if="formula !== null" :formula="formula"/>
            </v-sheet>
            <v-sheet rounded class="line-sheet" v-if="round">
                <span class="line-number font-weight-bold mr-3">{{ formulas.length + 1 }}</span>
                <span class="line-number">
                    Player {{
                        round.players[challengingPlayer].index + 1
                    }} has challenged player {{
                        round.players[((challengingPlayer - 1) + round.players.length) % round.players.length].index + 1
                    }}
                </span>
            </v-sheet>
        </v-card-text>
    </v-card>
</template>

<script>
import {VueMathjax} from 'vue-mathjax'
import {mapGetters, mapState} from "vuex";

export default {
    name: "LogicLines",
    components: {
        'vue-mathjax': VueMathjax,
    },
    data: () => ({}),
    mounted() {
        console.log(this.logicLines);
    },
    computed: {
        challengingPlayer() {
            return (this.round.bids.length - 2) % this.round.players.length;
        },
        formulas() {
            if (this.logicLines)
                return this.logicLines.map(l => l === '' || l === null ? null : `$${l}$`);
            return [];
        },
        logicLines() {
            return this.round?.beliefs;
        },
        ...mapGetters(['round']),
        ...mapState({
            viewedStep: state => state.viewedStep,
        }),
    }
}
</script>

<style scoped>
.logic-lines {
    overflow-y: auto;
}

.line-number {
    font-size: 17px;
}

.line-sheet {
    padding: 5px 15px;
}

.monospace {
    /*font-family: monospace;*/
    font-weight: bold;
    font-style: italic;
}
</style>
