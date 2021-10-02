// import Vue from 'vue'
// import VueCompositionAPI from '@vue/composition-api'

import i18n from './i18n';
import { addDecorator } from '@storybook/vue';
import Canvas from './components/Canvas.vue';

// Vue.use(VueCompositionAPI);

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
