import {
    FigSpecLayout,
    FigSpec
} from '../../../index.js';

export default {
    title: 'Layouts/SpecLayout',
    component: FigSpecLayout,
    argTypes: {
        zebra: {
            control: {
                type: 'boolean'
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigSpecLayout,
        FigSpec
    },
    setup() {
        return { args };
    },
    template: `
        <fig-spec-layout v-bind="args">
            <fig-spec>
                <template v-slot:label>The label</template>
                This is the Spec content
            </fig-spec>

            <fig-spec>
                <template v-slot:label>The label2</template>
                This is the Spec content
            </fig-spec>

            <fig-spec>
                <template v-slot:label>The label3</template>
                This is the Spec content
            </fig-spec>

            <fig-spec>
                <template v-slot:label>The label4</template>
                This is the Spec content
            </fig-spec>
        </fig-spec-layout>
    `
});

export const Spec = Template.bind({});
Spec.args = {
    zebra: true
};

