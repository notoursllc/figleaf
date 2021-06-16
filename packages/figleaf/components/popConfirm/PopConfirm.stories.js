import FigPopConfirm from './PopConfirm.vue';
import FigButton from '../button/Button.vue';

export default {
    title: 'Components/PopConfirm',

    component: FigPopConfirm,

    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigPopConfirm,
        FigButton
    },
    methods: {
        onConfirm() {
            console.log('onConfirm');
        },

        onCancel() {
            console.log('onCancel');
        }
    },
    template: `
        <fig-pop-confirm v-bind="$props" @cancel="onCancel" @confirm="onConfirm">
            <fig-button slot="reference">Click me</fig-button>
            <div>Are you sure you want to do this?</div>
        </fig-pop-confirm>
    `
});

export const PopConfirm = Template.bind({});
PopConfirm.args = {
};

