// import FigBadge from './Badge.vue';
import { FigBadge } from '../../../index.js';

import {
    badgeVariants,
    badgeSizes
} from './constants';

export default {
    title: 'Components/Badge',
    component: FigBadge,
    argTypes: {
        size: {
            control: { type: 'select' },
            options: Object.keys(badgeSizes)
        },

        variant: {
            control: { type: 'select' },
            options: Object.keys(badgeVariants)
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigBadge
    },
    setup() {
        return { args };
    },
    template: '<fig-badge v-bind="args">10</fig-badge>'
});

export const Badge = Template.bind({});
Badge.args = {
    size: badgeSizes.md,
    variant: badgeVariants.success
};

