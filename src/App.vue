<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-app-bar-title class="app-title">Truth Teller's Dice</v-app-bar-title>
            <v-spacer/>
            <v-btn icon>
                <v-icon>mdi-cog</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'App',
    data: () => ({}),
};
</script>

<style>
html, body {
    user-select: none;
    overflow-y: auto !important;
}

.app-title > * {
    min-width: 100% !important;
}
</style>
