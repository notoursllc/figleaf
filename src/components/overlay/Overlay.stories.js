import { ref } from 'vue';
import { FigOverlay } from '../../../index.js';
import {
    overlaySizes,
    overlayVariants
} from './constants';

export default {
    title: 'Components/Overlay',
    component: FigOverlay,
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(overlaySizes)
            }
        },

        variant: {
            control: {
                type: 'select',
                options: Object.keys(overlayVariants)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigOverlay
    },
    setup() {
        const showOverlay = ref(false);

        function toggleOverlay() {
            showOverlay.value = !showOverlay.value;
        }

        return {
            args,
            showOverlay,
            toggleOverlay
        };
    },
    template: `
        <div>
            <fig-overlay v-bind="args" :show="showOverlay">
                <div class="p-10 bg-blue-100">
                    Overlay wraps this element
                </div>
            </fig-overlay>

            <div class="mt-4">
                <button
                    class="border border-gray-500 bg-gray-300 p-2"
                    @click="toggleOverlay">Toggle overlay</button>
            </div>
        </div>
    `
});

export const Overlay = Template.bind({});
Overlay.args = {
    size: overlaySizes.md,
    variant: overlayVariants.primary
};
