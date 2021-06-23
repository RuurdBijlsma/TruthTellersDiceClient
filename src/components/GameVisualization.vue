<template>

    <v-card outlined class="game-vis">
      <v-card-title>
          Game visualisation
      </v-card-title>
        
      <v-container>   
        <div v-if="round.players.length <= 2">
          <v-row>
            <v-col v-for="(player, i) in round.players" :key="'player-'+i">
              <player-item :index="i" :round="round" :player="player"/>            
            </v-col> 
          </v-row> 
        </div>
        <div v-if="round.players.length === 3">
          <v-row>
            <v-col>
              <player-item :index="1" :round="round" :player="round.players[1]"/>            
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <player-item :index="0" :round="round" :player="round.players[0]"/>            
            </v-col>
            <v-col>
              <player-item :index="2" :round="round" :player="round.players[2]"/>            
            </v-col>
          </v-row>                  
        </div>   
        <div v-if="round.players.length === 4">
          <v-row>
            <v-col>
              <player-item :index="1" :round="round" :player="round.players[1]"/>            
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <player-item :index="0" :round="round" :player="round.players[0]"/>            
            </v-col>
            <v-col>
              <player-item :index="2" :round="round" :player="round.players[2]"/>            
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <player-item :index="3" :round="round" :player="round.players[3]"/>            
            </v-col>
          </v-row>          
        </div>             
      </v-container>
    </v-card>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import PlayerItem from './PlayerItem.vue';

export default {
    name: "GameVisualization",
    components: {PlayerItem},
    computed: {
        ...mapGetters(['round']),
        ...mapState({
            simulationResults: state => state.simulationResults,
            winner: state => state.game.winner,
        }),
    },
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
.game-vis {

}
</style>
