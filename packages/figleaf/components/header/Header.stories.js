import FigHeader from './Header.vue';
import FigVictoryIcon from '../icon/VictoryIcon.vue';

export default {
    title: 'Components/Header',

    component: FigHeader,

    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigHeader,
        FigVictoryIcon
    },
    methods: {
        onCartClick() {
            console.log('cart click');
        },

        onSidebarOpen() {
            console.log('sidebar open');
        }
    },
    template: `
        <div style="min-height: 200px">
            <fig-header @cartClick="onCartClick" @sidebarOpen="onSidebarOpen" v-bind="$props">
                <fig-victory-icon
                    slot="logo"
                    class="cursor-pointer"
                    fill="#565656"
                    :width="60"
                    :height="30" />

                <div slot="middle">nav goes here</div>
            </fig-header>
        </div>
    `
});

export const Header = Template.bind({});
Header.args = {};

