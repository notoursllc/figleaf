import { reactive, ref } from 'vue';
import { FigDisclosureNav } from '../../../index.js';

export default {
    title: 'Components/DisclosureNav',
    component: FigDisclosureNav,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigDisclosureNav
    },
    setup() {
        return {
            args
        };
    },
    template: `
        <div class="w-96">
            <fig-disclosure-nav v-bind="args" />
        </div>
    `
});

export const DisclosureNav = Template.bind({});
DisclosureNav.args = {
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

