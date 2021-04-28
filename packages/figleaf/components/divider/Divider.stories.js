import FigDivider from './Divider.vue';
import { dividerMargins } from './constants';

export default {
    title: 'Components/Divider',

    component: FigDivider,

    argTypes: {
        margin: {
            control: {
                type: 'select',
                options: dividerMargins
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigDivider
    },
    template: '<fig-divider v-bind="$props" />'
});

export const Divider = Template.bind({});
Divider.args = {
    margin: 5
};

