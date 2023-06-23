import { FigButton, FigIcon } from '../../../index.js';
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
    setup() {
        function onClick() {
            console.log('click');
        }

        return {
            args,
            onClick
        };
    },
    template: `
        <fig-button @click="onClick" v-bind="args">Button</fig-button>
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
    setup() {
        return {
            args
        };
    },
    template: `
        <div>
            <fig-button v-bind="args">
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

