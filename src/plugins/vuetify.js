import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

let dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if (localStorage.getItem('darkTheme') !== null)
    dark = localStorage.darkTheme === 'true';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark,
        themes: {
            dark: {
                primary: '#0e8979',
            },
            light: {
                primary: '#00bf8e',
            }
        }
    }
});
