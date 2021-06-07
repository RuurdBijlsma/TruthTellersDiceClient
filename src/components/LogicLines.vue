<template>
    <v-card outlined class="logic-lines">
        <v-card-title>
            Logic Lines
        </v-card-title>
        <v-card-text>
            <div class="mb-2" v-for="(formula, i) in formulas">
                <span class="line-number mr-5">{{ i + 1 }}.</span>
                <vue-mathjax :formula="formula"/>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
import {VueMathjax} from 'vue-mathjax'
import {mapState} from "vuex";

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
            return this.logicLines.map(l => `$${l}$`);
        },
        ...mapState({
            logicLines: state => state.game.logicLines,
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
</style>
