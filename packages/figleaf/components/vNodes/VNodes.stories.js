import FigVNodes from './VNodes.vue';

export default {
    title: 'Components/VNodes',

    component: FigVNodes,

    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigVNodes
    },
    data() {
        return {
            vnode: this.$createElement(
                'div',
                { class: 'font-bold text-red-600' },
                'This is a v-node'
            )
        }
    },
    template: '<fig-v-nodes v-bind="$props" :vnodes="vnode" />'
});

export const VNodes = Template.bind({});
VNodes.args = {
};

