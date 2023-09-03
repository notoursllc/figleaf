import { FigSidebarLayout } from '../../../index.js';

export default {
    title: 'Components/SidebarLayout',
    component: FigSidebarLayout,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigSidebarLayout
    },
    setup() {
        return {
            args
        };
    },
    template: `
        <div>
            <fig-sidebar-layout v-bind="args">
                <template #aboveContent>ABOVE CONTENT</template>
                <template #headerTools>HEADER TOOLS</template>
                MAIN BODY
            </fig-sidebar-layout>
        </div>
    `
});

export const SidebarLayout = Template.bind({});
SidebarLayout.args = {
    navItems: [
        {
            label: 'Home',
            href: '#',
            active: false,
            children: [],
            icon: null
        },
        {
            label: 'Second',
            href: '#',
            active: false,
            children: [
                { label: 'Second Child 1', href: '#', active: true, children: [], icon: null },
                { label: 'Second Child 2', href: '#', active: false, children: [], icon: null },
                { label: 'Second Child 3', href: '#', active: false, children: [], icon: null },
            ],
            icon: null
        },
        {
            label: 'Third',
            href: '#',
            active: false,
            children: [
                { label: 'Third Child 1', href: '#', active: false, children: [], icon: null },
                { label: 'Third Child 2', href: '#', active: false, children: [], icon: null },
            ],
            icon: null
        }
    ]
};

