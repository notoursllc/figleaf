import { addDecorator } from '@storybook/vue';
import Canvas from './components/Canvas.vue';

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
    template: `
        <Canvas>
            <story />
        </Canvas>
    `
}));
