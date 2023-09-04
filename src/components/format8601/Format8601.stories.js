import {
    FigFormat8601
 } from '../../../index.js';

export default {
    title: 'Components/Format8601',
    component: FigFormat8601,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormat8601
    },
    setup() {
        return { args };
    },
    template: `
        <fig-format-8601 v-bind="args" />
    `
});

export const Format8601 = Template.bind({});
Format8601.args = {
    date: '2022-03-18T21:32:55.304',
    // format: null,
    // timezone: null
};
