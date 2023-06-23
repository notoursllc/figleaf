import { FigMessage } from '../../../index.js';
import {
    messageSizes,
    messageVariants
} from './constants';

export default {
    title: 'Components/Message',
    component: FigMessage,
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(messageSizes)
            }
        },

        variant: {
            control: {
                type: 'select',
                options: Object.keys(messageVariants)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigMessage
    },
    setup() {
        return { args };
    },
    template: '<fig-message v-bind="args">Message goes here</fig-message>'
});

export const Message = Template.bind({});
Message.args = {
    size: messageSizes.md,
    variant: messageVariants.success
};

