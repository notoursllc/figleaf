import { FigJsonTree } from '../../../index.js';

export default {
    title: 'Components/JsonTree',
    component: FigJsonTree,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigJsonTree
    },
    setup() {
        return { args };
    },
    template: `
        <fig-json-tree v-bind="args" />
    `
});

export const JsonTree = Template.bind({});
JsonTree.args = {
    level: 2,
    data: {
        sample: {
            foo: 'bar',
            one: 1,
            bool: true,
            fal: false,
            nothing: null,
            obj: {
                one: 1,
                two: "2",
                three: {
                    four: 4,
                }
            },
            arr: [1,2,3,4,5],
            arr2: [
                { one: 1, two: "2" },
                { three: 3, four: "4" },
                { five: 5, six: "6" },
            ],
            arr3: [],
            arr4: [1],
        }
    }
};

