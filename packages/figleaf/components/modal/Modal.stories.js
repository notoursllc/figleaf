import FigModal from './Modal.vue';
import FigButton from '../button/Button.vue';
import { modalSizes } from './constants';

export default {
    title: 'Components/Modal',

    component: FigModal,

    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(modalSizes)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigModal,
        FigButton
    },
    methods: {
        showModal() {
            this.$refs.storymodal.show();
        }
    },
    template: `
        <div>
            <fig-modal v-bind="$props" ref="storymodal">
                <div slot="header">modal title</div>
                modal content
            </fig-modal>

            <fig-button @click="showModal">Show modal</fig-button>
        </div>
    `
});

export const Modal = Template.bind({});
Modal.args = {
    size: modalSizes.xl
};

