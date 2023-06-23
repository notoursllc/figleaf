import { FigTextCard } from '../../../index.js';
import { textCardVariants } from './constants';

export default {
    title: 'Components/TextCard',
    component: FigTextCard,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: Object.keys(textCardVariants)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigTextCard
    },
    setup() {
        return { args };
    },
    template: `
        <fig-text-card v-bind="args">
            <template v-slot:header_right>Header right</template>
            <template v-slot:header_left>Header left</template>
            Main content goes here
        </fig-text-card>
    `
});

export const TextCard = Template.bind({});
TextCard.args = {
    variant: textCardVariants.light
};

