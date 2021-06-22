<template>
    <v-card outlined class="logic-lines">
        <v-card-title>
            Logic per step
        </v-card-title>
        <v-card-text>
            <v-sheet rounded class="mb-2 line-sheet" v-for="(formula, i) in formulas" :key="i" :color="hoverStep === i + 1 ? 'primary' : 'default'">
                <span class="line-number mr-5">{{ i + 1 }}.</span>
                <vue-mathjax :formula="formula"/>
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
        formulas() {
            if (this.logicLines)
                return this.logicLines.map(l => `$${l}$`);
            return [];
        },
        logicLines() {
            return this.round?.beliefs;
        },
        ...mapGetters(['round']),
        ...mapState({
            hoverStep: state => state.hoverStep,
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

.line-sheet{
    padding: 5px 15px;
}
</style>
