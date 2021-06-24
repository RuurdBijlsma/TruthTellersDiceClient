<template>
    <div class="game-config">
        <div class="selectors">
            <v-select hide-details v-model="strategy" dense class="selector" :items="strategyItems"
                      title="Bidding strategy"
                      label="Strategy"/>
            <v-select hide-details v-model="nPlayers" dense class="selector" :items="playersItems"
                      label="# Players"/>
        </div>
        <div class="selectors">
            <v-select hide-details v-model="nDice" dense class="selector" :items="diceItems" label="# Dice"/>
            <v-select hide-details v-model="nDiceSides" dense class="selector" :items="sidesItems"
                      label="# Dice sides"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "GameConfig",
    data: () => ({
        strategyItems: ['Random', 'Passive', 'Aggressive'],
        playersItems: [2, 3, 4],
        diceItems: [1, 2, 3, 4],
        sidesItems: [2, 3, 4, 5, 6],
    }),
    computed: {
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
    }
}
</script>

<style scoped>
.game-config {
    display: flex;
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
</style>
