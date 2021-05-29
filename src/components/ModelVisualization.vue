<template>
    <v-card outlined class="model-vis">
        <v-card-title>
            Model visualisation
        </v-card-title>
        <v-card-text>
            <div class="graph"></div>
        </v-card-text>
        <v-card-actions>
            <v-btn text>Hi</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import * as d3 from "d3";

export default {
    name: "ModelVisualization",
    data: () => ({
        simulation: null,
    }),
    mounted: async function () {
        const {worlds, connection} = await fetch('./worlds.json').then(j => j.json());
        let nodes = worlds.map(w => ({id: w}));
        console.log(worlds, connection);
        let links = [];
        for (let i = 0; i < worlds.length; i++) {
            let worldA = worlds[i];
            for (let j = 0; j < worlds.length; j++) {
                if (j === i) continue;
                let worldB = worlds[j];
                let relation = connection[i][j];
                if (relation !== 0) {
                    let agents = relation.toString()
                        .split('')
                        .filter(s => s !== '0')
                        .map(a => (+a + 9).toString(36).toUpperCase())
                        .join(',');
                    links.push({source: worldA, target: worldB, relation: agents})
                    console.log(`relation ${worldA}-${worldB}=${agents}`);
                }
            }
        }
        console.log({nodes, links});


        const width = 400,
            height = 400;
        // const data = await fetch('./links.json').then(j => j.json());
        //
        // const links = data.links.map(d => Object.create(d));
        // const nodes = data.nodes.map(d => Object.create(d));

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody().strength(-500))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .force('collide', d3.forceCollide(d => 40))

        const svg = d3.select(".graph")
            .append("svg")
            .attr("viewBox", [-width / 2, -height / 2, width, height])

        const link = svg.append("g")
            .attr("fill", "none")
            .attr("stroke-width", 1.5)
            .selectAll("path")
            .data(links)
            .join("path")
            .attr("stroke", 'red')
            .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);

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

        const node = svg.append("g")
            .attr("fill", "currentColor")
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .call(drag(simulation));

        node.append("circle")
            .attr("stroke", "white")
            .attr("stroke-width", 1.5)
            .attr("r", 15)
            .attr('fill', d => '#6baed6');

        node.append("text")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", "0.31em")
            .text(d => d.id)
            .clone(true).lower()
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 3);

        node.on('dblclick', (e, d) => console.log(nodes[d.index]))

        const linkArc = d => `M${d.source.x},${d.source.y}A0,0 0 0,1 ${d.target.x},${d.target.y}`;
        simulation.on("tick", () => {
            link.attr("d", linkArc);
            node.attr("transform", d => `translate(${d.x},${d.y})`);
        });
    },
    methods: {
        dragStart(d) {
            if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        },
        dragMove(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        },
        dragEnd(d) {
            if (!d3.event.active) this.simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        },
    }
}
</script>

<style scoped>
.model-vis {

}
</style>
