import FigLabelValueGroup from './LabelValueGroup.vue';
import FigLabelValue from './LabelValue.vue';
import { labelValueGroupBreakpoints, labelValueGroupDensity } from './constants.js';

export default {
    title: 'Components/LabelValueGroup',

    component: FigLabelValueGroup,

    argTypes: {
        block: {
            type: 'boolean'
        },

        breakpoint: {
            control: {
                type: 'select',
                options: Object.keys(labelValueGroupBreakpoints)
            }
        },

        density: {
            control: {
                type: 'select',
                options: Object.keys(labelValueGroupDensity)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigLabelValueGroup,
        FigLabelValue
    },
    template: `
        <fig-label-value-group v-bind="$props">
            <fig-label-value>
                <template v-slot:label>label 1:</template>
                value 1
            </fig-label-value>

            <fig-label-value required>
                <template v-slot:label>label 2:</template>
                value 2
            </fig-label-value>

            <fig-label-value>
                <template v-slot:label>label 3:</template>
                value 3
                <template v-slot:error>Error message goes here</template>
            </fig-label-value>
        </fig-label-value-group>
    `
});

export const LabelValueGroup = Template.bind({});
LabelValueGroup.args = {
    block: false,
    breakpoint: labelValueGroupBreakpoints.sm,
    density: labelValueGroupDensity.sm
};

