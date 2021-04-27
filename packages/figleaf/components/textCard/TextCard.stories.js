import FigTextCard from './TextCard.vue';
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
    template: `
        <fig-text-card v-bind="$props">
            <div slot="header-right">Header right</div>
            <div slot="header-left">Header left</div>
            Main content goes here
        </fig-text-card>
    `
});

export const TextCard = Template.bind({});
TextCard.args = {
    variant: textCardVariants.light
};

