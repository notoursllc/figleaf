import { ref } from 'vue';
import { FigFormInputNumber } from '../../../../index.js';
import {
    formInputSizes
} from '../inputConstants.js';

export default {
    title: 'Components/Form/Number',
    component: FigFormInputNumber,
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(formInputSizes)
            }
        }
    }
};


const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormInputNumber
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
            <fig-form-input-number
                v-model="val"
                v-bind="args" />

            <div class="mt-4">value: {{ val }}</div>
            <div>type: {{ typeof val }}</div>
        </div>`
});

export const Number = Template.bind({});
Number.args = {
    size: formInputSizes.md,
    min: 0,
    max: 10
};

