import FigTexasToast from './TexasToast.vue';
import FigButton from '../button/Button.vue';
import { texasToastVariants } from './constants';

export default {
    title: 'Components/TexasToast',

    component: FigTexasToast,

    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: Object.keys(texasToastVariants)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigTexasToast,
        FigButton
    },
    methods: {
        onHide(buttonIndex) {
            console.log('hide', buttonIndex);
        },
        showToast() {
            this.$refs.ttoast.show();
        }
    },
    template: `
        <div>
            <fig-texas-toast @hide="onHide" ref="ttoast" v-bind="$props">
                <template v-slot:title>This is the title</template>
                <template v-slot:message>Your message goes here</template>
                <template v-slot:secondaryButtonLabel>View cart2</template>
                <template v-slot:primaryButtonLabel>Checkout2</template>
            </fig-texas-toast>

            <fig-button @click="showToast">Show Toast</fig-button>
        </div>
    `
});

export const TexasToast = Template.bind({});
TexasToast.args = {
    variant: texasToastVariants.success
};

