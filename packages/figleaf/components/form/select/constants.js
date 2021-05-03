export const formSelectProps = {
    value: {
        type: [String, Object],
        default: null
    },

    rightRadius: {
        type: Boolean,
        default: true
    },

    options: Array,
    reduce: Function,

    clearable: {
        type: Boolean,
        default: true
    },

    searchable: {
        type: Boolean,
        default: true
    },

    multiple: Boolean,
    placeholder: String,

    clearSearchOnSelect: {
        type: Boolean,
        default: true
    },

    label: String,
    autocomplete: String,

    closeOnSelect: {
        type: Boolean,
        default: true
    },
    selectable: Function,
    getOptionLabel: Function,
    getOptionKey: Function,
    onTab: Function,
    taggable: Boolean,
    tabindex: Number,
    pushTags: Boolean,

    filterable: {
        type: Boolean,
        default: true
    },

    filterBy: Function,
    filter: Function,
    createOption: Function,
    clearSearchOnBlur: Function,
    noDrop: Boolean,
    inputId: String,
    dir: String,
    selectOnTab: Boolean,
    selectOnKeyCodes: Array,
    searchInputQuerySelector: String,
    mapKeydown: Function,
    appendToBody: Boolean,
    calculatePosition: Function
};
