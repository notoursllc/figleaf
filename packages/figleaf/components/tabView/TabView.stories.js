import FigTabView from './TabView.vue';
import FigTabPanel from './TabPanel.vue';

export default {
    title: 'Components/TabView',

    component: FigTabView,

    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigTabView,
        FigTabPanel
    },
    data() {
        return {
            // activeIndex: 1
            tabs:  Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }))
        }
    },
    methods: {

    },
    template: `
        <fig-tab-view v-bind="$props">
            <fig-tab-panel
                v-for="(obj, idx) in tabs" :key="idx"
                :header="obj.title">
                {{ obj.content }}
            </fig-tab-panel>
        </fig-tab-view>
    `
});

export const TabView = Template.bind({});
TabView.args = {
    activeIndex: 2,
    scrollable: true
};
