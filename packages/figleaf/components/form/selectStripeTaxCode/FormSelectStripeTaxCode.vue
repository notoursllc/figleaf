<script>
import FigFormSelect from '../select/FormSelect.vue';
import FigButton from '../../button/Button.vue';

export default {
    name: 'FigFormSelectStripeTaxCode',

    components: {
        FigFormSelect,
        FigButton
    },

    props: {
        value: {
            type: String,
            default: null
        },

        placeholder: {
            type: String,
            default: null
        },

        size: {
            type: String,
            default: 'md'
        },

        clearable: {
            type: Boolean,
            default: true
        },

        taxCodes: {
            type: Array,
            default() {
                return [];
            }
        },

        whiteList: {
            type: Array,
            default() {
                return []
            }
        },

        allowOptionToggle: {
            type: Boolean,
            default: true
        }
    },

    data: function() {
        return {
            selected: null,
            allOptions: [],
            whitelistOptions: [],
            currentOptsIsWhiteList: false
        };
    },

    watch: {
        value: {
            handler(newVal) {
                this.taxCodes.forEach((obj) => {
                    if(newVal === obj.value) {
                        this.selected = obj;
                    }
                });

                this.currentOptsIsWhiteList = this.whiteList.includes(this.selected?.value);
            },
            immediate: true
        },

        taxCodes: {
            handler(newVal) {
                this.createOptions()
            },
            immediate: true
        },

        // whiteList: {
        //     handler(newVal) {
        //         this.currentOptsIsWhiteList = !!newVal.length;
        //     },
        //     immediate: true
        // }
    },

    computed: {
        canToggleWhitelist() {
            return this.allowOptionToggle && !!this.whiteList.length;
        },

        selectOpts() {
            return this.currentOptsIsWhiteList ? this.whitelistOptions : this.allOptions;
        },

        selectedValueDesc() {
            return this.selected ? this.selected.description : null;
        }
    },

    methods: {
        emitInput(val) {
            // when the select clear button is clicked then the val changes to "0",
            // but we want null instead:
            this.$emit('input', !val ? null : val.value);
        },

        toggleWhiteListOpts() {
            this.currentOptsIsWhiteList = !this.currentOptsIsWhiteList;
        },

        createOptions() {
            const allOpts = [];
            const whiteListOpts = [];

            this.taxCodes.forEach((obj) => {
                const opt = {
                    label: obj.name,
                    value: obj.id,
                    description: obj.description
                };

                allOpts.push(opt);

                if(this.value === opt.value) {
                    this.selected = opt;
                }

                if(this.whiteList.includes(obj.id)) {
                    whiteListOpts.push(opt);
                }
            });

            this.allOptions = allOpts;
            this.whitelistOptions = whiteListOpts;
        }
    }
};
</script>


<template>
    <div>
        <fig-form-select
            v-model="selected"
            :clearable="clearable"
            :options="selectOpts"
            :placeholder="placeholder"
            @input="emitInput"
            :size="size"
            v-bind="$attrs"
            class="w-full" />
        <div class="px-3 text-gray-500">
            <div v-if="selectedValueDesc" class="text-sm">{{ selectedValueDesc }}</div>
            <fig-button
                v-if="canToggleWhitelist"
                variant="link"
                size="sm"
                :icon="currentOptsIsWhiteList ? 'filter-off' : 'filter'"
                @click="toggleWhiteListOpts">{{ currentOptsIsWhiteList ? $t('See all tax codes') : $t('See common tax codes') }}</fig-button>
        </div>
    </div>
</template>
