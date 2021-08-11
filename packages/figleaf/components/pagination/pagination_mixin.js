export default {
    props: {
        perPage: {
            type: [Number, String],
            default: 100
        },

        totalRecords: {
            type: [Number, String],
            default: 0
        },

        buttonLimit: {
            type: [Number, String],
            default: 5
        }
    }
};
