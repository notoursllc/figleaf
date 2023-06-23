import { FigBooleanTag } from '../../../index.js';
import {
    tagSizes
} from '../tag/constants.js';

export default {
    title: 'Components/BooleanTag',
    component: FigBooleanTag,
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(tagSizes)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigBooleanTag
    },
    setup() {
        return { args };
    },
    template: '<fig-boolean-tag v-bind="args" />'
});

export const BooleanTag = Template.bind({});
BooleanTag.args = {
    size: tagSizes.lg
};
