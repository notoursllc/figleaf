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
                <template v-slot:top>Above header</template>
                <template v-slot:logo>
                    <fig-victory-icon
                        class="cursor-pointer"
                        fill="#565656"
                        :width="60"
                        :height="30" />
                </template>
                <template v-slot:middle>nav goes here</template>
                <template v-slot:right>
                    <div class="pr-4">curr chooser</div>
                </template>
            </fig-header>
        </div>
    `
});

export const Header = Template.bind({});
Header.args = {};

