export default class Round {
    constructor(dice, matrices, commonKnowledge, players, beliefs, worlds, bids, losingPlayer) {
        this.dice = dice;
        this.matrices = matrices;
        this.commonKnowledge = commonKnowledge;
        this.players = players;
        this.beliefs = beliefs;
        this.worlds = worlds;
        this.bids = bids;
        this.loser = losingPlayer;
    }
}
