import { ref } from 'vue';
import { FigFormText } from '../../../../index.js';
import {
    formInputSizes
} from '../inputConstants.js';

export default {
    title: 'Components/Form/TextInput',
    component: FigFormText,
    argTypes: {
        size: {
            control: { type: 'select' },
            options: Object.keys(formInputSizes)
        },

        placeholder: {
            control: {
                type: 'text'
            }
        }
    }
};


const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormText
    },
    setup() {
        return { args };
    },
    template: '<fig-form-text v-bind="args" />'
});

export const TextInput = Template.bind({});
TextInput.args = {
    size: formInputSizes.md,
    state: null
};


///////////


const Template2 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormText
    },
    setup() {
        return { args };
    },
    template: `
        <fig-form-text v-bind="args">
            <template v-slot:label>First name</template>
        </fig-form-text>
    `
});


export const WithLabel = Template2.bind({});
WithLabel.args = {
    size: formInputSizes.md,
    state: null
};


///////////


const Template3 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormText
    },
    setup() {
        const val = ref(null);
        return {
            val,
            args
        };
    },
    template: `
        <div>
            <fig-form-text
                v-model="val"
                v-bind="args" />

            <p>Value: {{ val }}</p>
            <p>type: {{ typeof val }}</p>
        </div>
    `
});


export const TypeNumber = Template3.bind({});
TypeNumber.args = {
    type: 'number',
    min: 0,
    max: 10,
    step: 1
};

