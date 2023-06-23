import {
    FigIconLabel,
    FigIcon
} from '../../../index.js';

export default {
    title: 'Components/IconLabel',
    component: FigIconLabel,
    argTypes: {
        classes: {
            control: {
                type: 'text'
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigIconLabel,
        FigIcon
    },
    setup() {
        return { args };
    },
    template: `
        <fig-icon-label v-bind="args">
            <template v-slot:left>
                <fig-icon
                    icon="cart"
                    width="24"
                    height="24" />
                </template>
            Icon on the left
        </fig-icon-label>`
});

export const LeftIcon = Template.bind({});
LeftIcon.storyName = 'icon on the left';
LeftIcon.args = {};


//////////


const Template2 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigIconLabel,
        FigIcon
    },
    setup() {
        return { args };
    },
    template: `
        <fig-icon-label v-bind="args">
            <template v-slot:right>
                <fig-icon
                    icon="cart"
                    width="24"
                    height="24" />
            </template>
            Icon on the right
        </fig-icon-label>`
});

export const RightIcon = Template2.bind({});
RightIcon.storyName = 'icon on the right';
RightIcon.args = {};
