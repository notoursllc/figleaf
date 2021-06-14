import FigTag from './Tag.vue';
import {
    tagVariants,
    tagSizes
} from './constants';

export default {
    title: 'Components/Tag',

    component: FigTag,

    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(tagSizes)
            }
        },

        variant: {
            control: {
                type: 'select',
                options: Object.keys(tagVariants)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigTag
    },
    template: '<fig-tag v-bind="$props">Tag</fig-tag>'
});

export const Tag = Template.bind({});
Tag.args = {
    size: tagSizes.lg,
    variant: tagVariants.light
};

