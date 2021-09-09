import FigButton from './Button.vue';
import FigIcon from '../icon/FigIcon.vue';

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
    template: `
        <div>
            <fig-button @click="onClick" v-bind="$props">Button</fig-button>
        </div>
    `
});

export const Button = Template.bind({});
Button.args = {
    size: buttonSizes.md,
    variant: buttonVariants.plain,
    type: buttonTypes.button
};


const Template2 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigButton,
        FigIcon
    },
    template: `
        <div>
            <fig-button v-bind="$props">
                <template v-slot:icon>
                    <fig-icon
                        icon="chevron-right"
                        :width="18"
                        :height="18"
                        stroke="#fff"
                        :stroke-width="2" />
                </template>
                Button with icon
            </fig-button>
        </div>
    `
});

export const ButtonWithIcon = Template2.bind({});
ButtonWithIcon.args = {
    variant: buttonVariants.primary,
};

