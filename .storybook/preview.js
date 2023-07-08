/*
* https://storybook.js.org/docs/vue/writing-stories/decorators#context-for-mocking
*/
import { setup } from '@storybook/vue3';
import Canvas from './components/Canvas.vue';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import ConfirmPlugin from '../src/components/confirm/index.js';
import I18nPlugin from './plugins/i18n.js';

setup((app) => {
    app.use(ConfirmPlugin);
    app.use(I18nPlugin);
});

export const parameters = {
    actions: {
        argTypesRegex: "^on[A-Z].*"
    },

    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },

    viewport: {
        viewports: MINIMAL_VIEWPORTS,
    },
};

export const decorators = [
    (story) => ({
        components: {
            Canvas
        },
        template: `
            <Canvas>
                <story />
            </Canvas>
        `
    })
];
