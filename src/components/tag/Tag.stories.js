import { FigTag } from '../../../index.js';
import {
    tagVariants,
    tagSizes
} from './constants';

export default {
    title: 'Components/Tag',
    component: FigTag,
    argTypes: {
        size: {
            control: { type: 'select' },
            options: Object.keys(tagSizes)
        },

        variant: {
            control: { type: 'select' },
            options: Object.keys(tagVariants)
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigTag
    },
    setup() {
        return { args };
    },
    template: '<fig-tag v-bind="args">Tag</fig-tag>'
});

export const Tag = Template.bind({});
Tag.args = {
    size: tagSizes.lg,
    variant: tagVariants.light
};
