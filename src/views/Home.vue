<template>
    <div class="home">
        <div class="top-pane">
            <game-visualization class="left-pane"/>
            <model-visualization class="right-pane"/>
        </div>
        <logic-lines class="bottom-pane"/>
    </div>
</template>

<script>
import GameVisualization from "@/components/GameVisualization";
import ModelVisualization from "@/components/ModelVisualization";
import LogicLines from "@/components/LogicLines";
export default {
    name: 'Home',
    components: {LogicLines, ModelVisualization, GameVisualization},
}
</script>

<style>
.home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.top-pane {
    display: flex;
    flex-grow: 2;
}

.left-pane {
    flex-grow: 1;
}

.right-pane {
    flex-grow: 1;
}

.bottom-pane {
    flex-grow: 1;
}
</style>
