import { ref } from 'vue';
import { FigTexasToast } from '../../../index.js';

export default {
    title: 'Components/TexasToast',
    component: FigTexasToast,
    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigTexasToast
    },
    setup() {
        const tt = ref(null);

        function onHide(buttonIndex) {
            console.log('onHide', buttonIndex);
        }

        return {
            tt,
            onHide,
            args
        };
    },
    template: `
        <div>
            <fig-texas-toast
                ref="tt"
                @hide="onHide"
                v-bind="args">
                <template v-slot:title>Your title here</template>
                <template v-slot:message>Your message goes here</template>
            </fig-texas-toast>

            <button @click="tt.show()">Show</button>
        </div>
    `
});

export const TexasToast = Template.bind({});
TexasToast.args = {
};
