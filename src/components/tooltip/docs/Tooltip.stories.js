import { ref } from 'vue';
import { FigTooltip } from '../../../../index.js';

export default {
    title: 'Components/Tooltip',
    component: FigTooltip,
    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigTooltip
    },
    setup() {
        return { args };
    },
    template: `
        <fig-tooltip v-bind="args">
            <template v-slot:toggler>
                <button>Hover me</button>
            </template>
            This is the tooltip content
        </fig-tooltip>
    `
});

export const Tooltip = Template.bind({});
Tooltip.args = {

};



const Template2 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigTooltip
    },
    setup() {
        const btn = ref(null);
        return {
            btn,
            args
        };
    },
    template: `
        <div>
            <button ref="btn">Another target</button>

            <fig-tooltip v-bind="args" :target="btn">
                This is the tooltip content
            </fig-tooltip>
        </div>
    `
});

export const UsingTarget = Template2.bind({});
UsingTarget.args = {
};
