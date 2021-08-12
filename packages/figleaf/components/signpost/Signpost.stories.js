import FigSignpost from './Signpost.vue';
import { popoverPositions, popoverDisplayAction } from '../popover/constants';

export default {
    title: 'Components/Signpost',

    component: FigSignpost,

    argTypes: {
        placement: {
            control: {
                type: 'select',
                options: Object.keys(popoverPositions)
            }
        },

        displayAction: {
            control: {
                type: 'select',
                options: Object.keys(popoverDisplayAction)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigSignpost
    },
    template: '<fig-signpost v-bind="$props">this is the signpost popover content</fig-signpost>'
});

export const Signpost = Template.bind({});
Signpost.args = {
    placement: popoverPositions['bottom-start'],
    displayAction: popoverDisplayAction.mouseover
};

