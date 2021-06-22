<template>
    <v-card outlined class="model-vis">
        <v-card-text>
            <svg class="svg" width="480" height="420">
                <g class="links"/>
                <g class="nodes"/>
            </svg>
        </v-card-text>
        <v-card-actions class="actions">
            <v-switch v-model="relationLabels" label="Relation labels"/>
            <div>
                <span class="mr-2">Select step</span>
                <v-chip-group mandatory v-model="viewedStep" active-class="primary--text" v-if="matrices">
                    <v-chip outlined :key="i - 1" v-for="i in matrices.length">
                        {{ i }}
                    </v-chip>
                </v-chip-group>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script>
//Todo
//Legend for meaning of colors

import * as d3 from "d3";
import {mapGetters, mapState} from "vuex";

export default {
    name: "ModelVisualization",
    data: () => ({
        relationLabels: false,
        simulation: null,
        svg: null,
        linkText: null,
        links: null,
        graph: null,
        socket: null,
        serverConnecting: true,
    }),
    async mounted() {
        this.updateGraph();
    },
    methods: {
        buildChart(graph) {
            let svg = d3.select('.svg')
            const width = +svg.attr('width');
            const height = +svg.attr('height');
            const nodesG = svg.select("g.nodes")
            const linksG = svg.select("g.links");
            const dark = this.$vuetify.theme.dark;

            const simulation = d3.forceSimulation()
                .force("link", d3.forceLink().id(d => d.id))
                .force("charge", d3.forceManyBody().strength(-300))
                .force("x", d3.forceX())
                .force("y", d3.forceY())
                .force("center", d3.forceCenter(width / 2, height / 2))


            let linksData = graph.links.map(link => {
                const obj = link;
                obj.source = link.source;
                obj.target = link.target;
                return obj;
            })

            this.links = linksG
                .selectAll("g")
                .data(graph.links)
                .enter().append("g")
                .attr("cursor", "pointer");

            if (this.relationLabels)
                this.addLinkText();

            const linkLines = this.links
                .append("path")
                .attr("id", function (_, i) {
                    return "path" + i
                })
                .attr('stroke', d => this.relationToColor[d.relation])
                .attr('opacity', 0.75)
                .attr("stroke-width", dark ? 2 : 1)
                .attr("fill", "transparent")

            const drag = simulation => d3.drag()
                .on("start", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on("drag", (event, d) => {
                    d.fx = event.x;
                    d.fy = event.y;
                })
                .on("end", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                })
            const nodes = nodesG
                .selectAll("g")
                .data(graph.nodes)
                .enter().append("g")
                .attr("cursor", "pointer")
                .call(drag(simulation));

            nodes.append("circle")
                .attr("r", 12)
                .attr("fill", dark ? 'white' : 'black')

            nodes.append("title")
                .text(function (d) {
                    return d.id;
                });

            let nodeText =
                nodes.append("text")
                    .attr("text-anchor", "middle")
                    .attr("x", 0)
                    .attr("y", "2em")
                    .text(d => d.id)
            if (dark)
                nodeText
                    .attr("fill", "white")
                    .clone(true).lower()
                    .attr("stroke", 'black')
                    .attr("stroke-width", 2);
            else
                nodeText
                    .clone(true).lower()
                    .attr("fill", "transparent")
                    .attr("stroke", 'white')
                    .attr("stroke-width", 2);

            simulation
                .nodes(graph.nodes)
                .on("tick", ticked);

            simulation.force("link", d3.forceLink().links(linksData)
                .id(d => d.id)
                .distance(250));

            function ticked() {
                linkLines.attr("d", function (d) {
                    const dx = (d.target.x - d.source.x),
                        dy = (d.target.y - d.source.y),
                        dr = Math.sqrt(dx * dx + dy * dy);
                    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
                });

                // recalculate and back off the distance
                linkLines.attr("d", function (d) {

                    // length of current path
                    const pl = this.getTotalLength(),
                        // radius of circle plus backoff
                        r = (12),
                        // position close to where path intercepts circle
                        m = this.getPointAtLength(pl - r);

                    const dx = m.x - d.source.x,
                        dy = m.y - d.source.y,
                        dr = Math.sqrt(dx * dx + dy * dy);

                    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + m.x + "," + m.y;
                });

                if (this.linkText) {
                    this.linkText
                        .attr("x", function (d) {
                            return (d.source.x + (d.target.x - d.source.x) * 0.5);
                        })
                        .attr("y", function (d) {
                            return (d.source.y + (d.target.y - d.source.y) * 0.5);
                        })

                }

                nodes.attr("transform", d => `translate(${d.x}, ${d.y})`);
            }

            return [svg, simulation];
        },
        addLinkText() {
            this.linkText = this.links
                .append("text")
                .attr('class', 'link-text')
                .attr("dy", -4)
                .append("textPath")
                .attr("xlink:href", function (_, i) {
                    return "#path" + i
                })
                .attr("startOffset", "50%")
                .attr('fill', d => this.relationToColor[d.relation])
                .attr('opacity', 1)
                .text(d => d.relation);
        },
        removeLinkText() {
            this.svg.selectAll('text.link-text').remove();
        },
        destroyChart() {
            if (this.svg === null)
                return;
            this.svg.selectAll("*").remove();
            this.svg
                .append('g')
                .attr('class', 'links');
            this.svg
                .append('g')
                .attr('class', 'nodes');
            this.simulation.stop();
        },
        updateGraph() {
            if (!this.matrices?.[this.viewedStep] || this.worlds.length === 0)
                return;
            const worlds = this.worlds.map(w => w.join(','));
            const connection = this.matrices[this.viewedStep];
            let nodes = worlds.map(w => ({id: w}));
            let links = [];
            for (let i = 0; i < worlds.length; i++) {
                let worldA = worlds[i];
                for (let j = i; j < worlds.length; j++) {
                    if (j === i) continue;
                    let worldB = worlds[j];
                    let relation = connection[i][j];
                    if (relation !== 0) {
                        let agents = relation.toString()
                            .split('')
                            .filter(s => s !== '0')
                            .map(a => (+a + 9).toString(36).toUpperCase())
                            .join(',');
                        links.push({source: worldA, target: worldB, relation: agents});
                    }
                }
            }
            this.graph = {nodes: nodes, links: links};
            this.destroyChart();
            [this.svg, this.simulation] = this.buildChart(this.graph);
        },
    },
    computed: {
        viewedStep: {
            get(){
                return this.$store.state.viewedStep;
            },
            set(v){
                this.$store.commit('viewedStep', v);
            },
        },
        matrices() {
            return this.round?.matrices;
        },
        relationToColor() {
            const dark = this.$vuetify.theme.dark;
            if (this.round.players.length === 2) {
                return {
                    'A': dark ? '#ff8888' : 'red',
                    'B': dark ? 'lightgreen' : 'green',
                    'A,B': dark ? 'white' : 'black',
                };
            } else if (this.round.players.length === 3) {
                return {
                    'A': dark ? '#ff8888' : 'red',
                    'B': dark ? 'lightgreen' : 'green',
                    'C': dark ? 'skyblue' : 'blue',
                    'A,B': dark ? 'orange' : 'orange',
                    'A,C': dark ? 'magenta' : 'purple',
                    'B,C': dark ? 'cyan' : 'cyan',
                    'A,B,C': dark ? 'white' : 'black',
                };
            } else {
                return {
                    'A': dark ? '#ff8888' : 'red',
                    'B': dark ? 'lightgreen' : 'green',
                    'C': dark ? 'skyblue' : 'blue',
                    'D': dark ? '#878787' : '#878787',
                    'A,B': dark ? 'orange' : 'orange',
                    'A,C': dark ? 'magenta' : 'purple',
                    'B,C': dark ? 'cyan' : 'cyan',
                    'A,D': dark ? '#b86464' : '#9e4a4a',
                    'B,D': dark ? '#518b42' : '#518b42',
                    'C,D': dark ? '#425e87' : '#425e87',
                    'A,B,C': dark ? '#6c6c6c' : '#323232',
                    'A,B,D': dark ? '#875e3c' : '#875e3c',
                    'A,C,D': dark ? '#653579' : '#653579',
                    'B,C,D': dark ? '#428778' : '#428778',
                    'A,B,C,D': dark ? 'white' : 'black',
                };
            }
        },
        ...mapGetters(['round']),
        ...mapState({
            nPlayers: state => state.game.nPlayers,
            worlds: state => state.game.worlds,
        }),
    },
    watch: {
        viewedStep() {
            this.updateGraph();
        },
        round() {
            this.viewedStep = 0;
            this.updateGraph();
        },
        worlds() {
            this.updateGraph();
        },
        '$vuetify.theme.dark'() {
            this.updateGraph();
        },
        relationLabels() {
            if (this.relationLabels)
                this.addLinkText();
            else
                this.removeLinkText();
        },
    },
}
</script>

<style scoped>
.model-vis {
    max-width: 620px;
}

.actions {
    display: flex;
    justify-content: space-around;
    text-align: center;
}
</style>
