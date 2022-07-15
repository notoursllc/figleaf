import FigCompareAddressModal from './CompareAddressModal.vue';
import FigButton from '../button/Button.vue';

export default {
    title: 'Components/CompareAddressModal',

    component: FigCompareAddressModal,

    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigCompareAddressModal,
        FigButton
    },
    methods: {
        onShowModal() {
            this.$refs.comparemodal.show();
        },

        onUseOriginal(data) {
            console.log("USE ORIGINAL", data);
        },

        onUseSuggested(data) {
            console.log("USE SUGGESTED", data);
        },

        onEdit() {
            console.log("EDIT");
        }
    },
    template: `
        <div>
            <fig-compare-address-modal
                ref="comparemodal"
                original-line1="1 portola dr"
                original-city="San Mateo"
                original-state="CA"
                original-zip="94402"
                original-country="US"
                suggested-line1="240 portola dr"
                suggested-city="San Mateo"
                suggested-state="CA"
                suggested-zip="94403"
                suggested-country="US"
                @original="onUseOriginal"
                @suggested="onUseSuggested"
                @edit="onEdit"
            />
            <fig-button @click="onShowModal">Show modal</fig-button>
        </div>
    `
});

export const CompareAddressModal = Template.bind({});
CompareAddressModal.storyName = "CompareAddressModal";
CompareAddressModal.args = {

};
