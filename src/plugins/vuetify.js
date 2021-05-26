import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            dark: {
                primary: '#0fd0b9',
            },
            light: {
                primary: '#00bf8e',
            }
        }
    }
});
