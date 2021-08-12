import { popoverPositions, popoverDisplayAction } from './constants';

export default {
    props: {
        placement: {
            type: String,
            default: popoverPositions['bottom-start'],
            validator: (value) => Object.keys(popoverPositions).includes(value)
        },

        show: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        },

        offset: {
            type: Array,
            default: () => [0, 10]
        },

        flip: {
            type: Boolean,
            default: true
        },

        customPopperOptions: {
            type: Object,
            default: null
        },

        target: {},

        displayAction: {
            type: String,
            default: popoverDisplayAction.click,
            validator: (value) => Object.keys(popoverDisplayAction).includes(value)
        }
    }
};
