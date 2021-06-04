<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-app-bar-title class="app-title">Truth Teller's Dice</v-app-bar-title>
            <v-spacer/>
            <v-btn class="mr-3" text to="/" exact>Home</v-btn>
            <v-btn text to="/about">About</v-btn>
            <v-spacer/>
            <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon
                           v-bind="attrs"
                           v-on="on">
                        <v-icon>mdi-cog-outline</v-icon>
                    </v-btn>
                </template>
                <v-list dense>
                    <v-list-item to="/settings">
                        <v-list-item-icon>
                            <v-icon>mdi-cog-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Settings</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item color="primary" class="center-list-item">
                        <v-list-item-icon>
                            <v-icon>mdi-brightness-6</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                <span>Dark theme</span>
                            </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-switch hide-details dense inset v-model="$vuetify.theme.dark"></v-switch>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-menu>
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
    watch:{
        '$vuetify.theme.dark'() {
            console.log(this.$vuetify.theme.dark);
            localStorage.darkTheme = this.$vuetify.theme.dark;
        },
    }
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
