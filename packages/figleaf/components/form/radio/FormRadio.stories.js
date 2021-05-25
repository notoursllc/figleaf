import FigFormRadio from './FormRadio.vue';

export default {
    title: 'Components/Form/Radio',

    component: FigFormRadio,

    argTypes: {
        value: {
            type: null,
            table: {
                type: { summary: null }
            }
        },

        checkedValue: {
            name: 'checked value',
            table: {
                type: { summary: 'any' }
            }
        }
    }
};


const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormRadio
    },
    data: () => {
        return {
            selectedRadio: 1
        };
    },
    template: `
        <div>
            <div><fig-form-radio v-bind="$props" name="selectedNumber" :checked-value="1" v-model="selectedRadio">One</fig-form-radio></div>
            <div><fig-form-radio v-bind="$props" name="selectedNumber" :checked-value="2" v-model="selectedRadio">Two</fig-form-radio></div>
            <div><fig-form-radio v-bind="$props" name="selectedNumber" :checked-value="3" v-model="selectedRadio">Three</fig-form-radio></div>
            <div>Selected: {{ selectedRadio }}</div>
        </div>
    `
});

export const Radio = Template.bind({});
Radio.args = {
    block: true
};


///////


const Template2 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormRadio
    },
    data: () => {
        return {
            selectedRadio: {one: 1, two: 2}
        };
    },
    template: `
        <div>
            <div><fig-form-radio v-bind="$props" name="selectedNumber" :checked-value="{one: 1, two: 2}" v-model="selectedRadio">One</fig-form-radio></div>
            <div><fig-form-radio v-bind="$props" name="selectedNumber" :checked-value="{three: 3, four: 4}" v-model="selectedRadio">Two</fig-form-radio></div>
            <div><fig-form-radio v-bind="$props" name="selectedNumber" :checked-value="{five: 5, six: 6}" v-model="selectedRadio">Three</fig-form-radio></div>
            <div>Selected: {{ selectedRadio }}</div>
        </div>
    `
});

export const ObjectValue = Template2.bind({});
ObjectValue.args = {
    block: true
};
