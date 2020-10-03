import { addDecorator } from '@storybook/vue';
import Canvas from './components/Canvas.vue';


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
