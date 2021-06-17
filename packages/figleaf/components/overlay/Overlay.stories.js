import FigOverlay from './Overlay.vue';
import FigButton from '../button/Button.vue';
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
        FigOverlay,
        FigButton
    },
    data() {
        return {
            showOverlay: false
        };
    },
    methods: {
        toggleOverlay() {
            this.showOverlay = !this.showOverlay;
        }
    },
    template: `
        <div>
            <fig-overlay v-bind="$props" :show="showOverlay">
                <div class="pt-5 px-5 pb-11 bg-blue-100">
                    Overlay wraps this element
                </div>
            </fig-overlay>

            <div class="pt-4">
                <fig-button @click="toggleOverlay">Toggle overlay</fig-button>
            </div>
        </div>
    `
});

export const Overlay = Template.bind({});
Overlay.args = {
    size: overlaySizes.md,
    variant: overlayVariants.primary
};

