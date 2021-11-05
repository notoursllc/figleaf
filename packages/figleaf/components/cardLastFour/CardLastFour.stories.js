import FigCardLastFour from './CardLastFour.vue';
import { cardTypes } from '../icon/creditCard/constants.js';

export default {
    title: 'Components/CardLastFour',

    component: FigCardLastFour,

    argTypes: {
        type: {
            control: {
                type: 'select',
                options: Object.keys(cardTypes)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigCardLastFour
    },
    template: '<fig-card-last-four v-bind="$props" />'
});

export const CardLastFour = Template.bind({});
CardLastFour.storyName = 'CardLastFour';
CardLastFour.args = {
    type: cardTypes.visa,
    lastFour: 1234
};

