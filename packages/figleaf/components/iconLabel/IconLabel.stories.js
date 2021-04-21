import FigIconLabel from './IconLabel.vue';
import FigIcon from '../icon/FigIcon.vue';

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
    template: `
        <fig-icon-label v-bind="$props">
            <fig-icon
                slot="left"
                icon="cart"
                width="18"
                height="18" />
            Icon on the left
        </fig-button>`
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
    template: `
        <fig-icon-label v-bind="$props">
            <fig-icon
                slot="right"
                icon="cart"
                width="18"
                height="18" />
            Icon on the right
        </fig-button>`
});

export const RightIcon = Template2.bind({});
RightIcon.storyName = 'icon on the right';
RightIcon.args = {};

