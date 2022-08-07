// import VueCompositionAPI from '@vue/composition-api'
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { addDecorator } from '@storybook/vue';
import Canvas from './components/Canvas.vue';

Vue.use(VueI18n);
// Vue.use(VueCompositionAPI);

import enUS from '../packages/figleaf/locales/en-US.js';

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        'en': enUS
    },
    numberFormats: {
        'en': {
            currency: {
                style: 'currency',
                currency: 'USD',
                notation: 'standard'
            }
        }
    }
});

// Hook a global method here
// So you can use {{ $t() }} in Vue.js single file component without error.
// Vue.prototype.$t = function(...args){
//     return i18n.t(...args);
// }
// Vue.prototype.$n = function(...args){
//     return i18n.n(...args);
// }


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

addDecorator(() => ({
    components: {
        Canvas
    },
    i18n,
    template: `
        <Canvas>
            <story />
        </Canvas>
    `
}));
