import FigButton from './Button.vue';
import {
    buttonSizes,
    buttonVariants,
    buttonTypes
} from './constants';

export default {
    title: 'Components/Button',

    component: FigButton,

    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(buttonSizes)
            }
        },

        variant: {
            control: {
                type: 'select',
                options: Object.keys(buttonVariants)
            }
        },

        type: {
            control: {
                type: 'select',
                options: Object.keys(buttonTypes)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigButton
    },
    methods: {
        onClick() {
            console.log('click');
        }
    },
    template: '<fig-button @click="onClick" v-bind="$props">Button</fig-button>'
});

export const Button = Template.bind({});
Button.args = {
    size: buttonSizes.md,
    variant: buttonVariants.plain,
    type: buttonTypes.button
};

