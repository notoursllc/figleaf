import FigFormGroup from './FormGroup.vue';
import FigFormText from '../text/FormText.vue';

export default {
    title: 'Components/Form/Group',

    component: FigFormGroup,

    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormGroup,
        FigFormText
    },
    data: function() {
        return {
            inputVal: null
        };
    },
    template: `
        <fig-form-group v-bind="$props">
            <template slot="label">First name</template>
            <fig-form-text v-model="inputVal" />
        </fig-form-group>
    `
});

export const FormGroup = Template.bind({});
FormGroup.args = {};
