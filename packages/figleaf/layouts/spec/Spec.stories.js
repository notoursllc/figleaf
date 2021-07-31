import FigSpecLayout from './SpecLayout.vue';
import FigSpec from './Spec.vue';

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
    template: `
        <fig-spec-layout v-bind="$props">
            <fig-spec>
                <label slot="label">The label</label>
                This is the Spec content
            </fig-spec>

            <fig-spec>
                <label slot="label">The label2</label>
                This is the Spec content
            </fig-spec>

            <fig-spec>
                <label slot="label">The label3</label>
                This is the Spec content
            </fig-spec>

            <fig-spec>
                <label slot="label">The label4</label>
                This is the Spec content
            </fig-spec>
        </fig-spec-layout>
    `
});

export const Spec = Template.bind({});
Spec.args = {
    zebra: true
};

