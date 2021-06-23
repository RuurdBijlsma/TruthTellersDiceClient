<template>    
    <div class="player-item">        
        <div class="align-center">Player {{player + 1}}</div>
        <v-col align="center">
            <v-avatar color="green" size="75">
            <img :src="getPlayerImgUrl(index + 1)" :alt="'Player' + (index+1)" />
            </v-avatar>
        </v-col>
        <v-col align="center">
            <v-row>
            <v-col v-for="(dice, i) in round.dice[index]" :key="'dice-' + i" align="center">
                <v-avatar size="42">
                <img :src="getDiceImgUrl(dice)" :alt="'Dice' + (index+1)" />
                </v-avatar>
            </v-col>
            </v-row>
        </v-col>
    </div>
</template>
<script>
export default {
    name: "PlayerItem",  
    props: ["index", "round", "player"], 
    methods: {
      getPlayerImgUrl(playerId) {        
        return '../assets/player' + playerId + ".png"
      },
      getDiceImgUrl(diceId) {
        return '../assets/dice_' + diceId + ".png"
      }
    }
}
</script>
<style scoped>
.player-item {
    width: 150px;
    margin: auto;
}
.align-center {
  text-align: center;
}
</style>