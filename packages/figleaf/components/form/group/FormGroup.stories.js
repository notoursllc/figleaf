import FigFormGroup from './FormGroup.vue';
import FigFormInput from '../FormInput.vue';

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
        FigFormInput
    },
    data: function() {
        return {
            inputVal: null
        };
    },
    template: `
        <fig-form-group v-bind="$props">
            <template slot="label">First name</template>
            <fig-form-input v-model="inputVal" />
        </fig-form-group>
    `
});

export const FormGroup = Template.bind({});
FormGroup.args = {};
