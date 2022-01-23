import resizeObserver from './resizeObserver.js';

export default {
    title: 'Directives/ResizeObserver'
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    directives: {
        resizeObserver
    },
    data() {
        return {
            resizeData: {}
        }
    },
    methods: {
        handleResize(val) {
            this.resizeData = val;
        }
    },
    template: `
        <div v-resize-observer="handleResize" class="flex items-center justify-center p-4 bg-gray-200">
            {{ resizeData }}
        </div>
    `
});

export const ResizeObserver = Template.bind({});
ResizeObserver.args = {
};

