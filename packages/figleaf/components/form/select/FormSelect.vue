<script>
import vSelect from 'vue-select';
import FigIcon from '../../icon/FigIcon';
import { formSelectProps } from './constants';
import form_input_mixin from '../form_input_mixin';
import 'vue-select/dist/vue-select.css';

export default {
    name: 'FormSelect',

    components: {
        vSelect
    },

    mixins: [
        form_input_mixin
    ],

    props: {
        ...formSelectProps
    },

    data: () => ({
        // https://vue-select.org/guide/components.html#deselect
        Deselect: {
            render: (h) => {
                return h(
                    FigIcon,
                    {
                        attrs: {
                            icon: 'x',
                            width: 18,
                            height: 18,
                            'stroke-width': 1
                        }
                    }
                );
            }
        },

        // https://vue-select.org/guide/components.html#openindicator
        OpenIndicator: {
            render: (h) => {
                return h(
                    FigIcon,
                    {
                        attrs: {
                            icon: 'chevron-down',
                            width: 20,
                            height: 20,
                            'stroke-width': 1
                        }
                    }
                );
            }
        }
    }),

    computed: {
        classNames() {
            const names = [
                'fig-select',
                `fig-select-${this.size || 'md'}`,
                this.formInputMix_stateClass
            ];

            if(!this.rightRadius) {
                names.push('fig-select-no-right-radius');
            }

            return names;
        }
    }
};
</script>


<template>
    <v-select
        :components="{Deselect, OpenIndicator}"
        :class="classNames"
        v-on="$listeners"
        v-bind="$props">
        <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
    </v-select>
</template>


<style>
.fig-select {
    @apply bg-white;
}
.fig-select input {
    @apply placeholder-gray-400;
}
.fig-select .fig-icon.vs__open-indicator {
    fill: none;
}

.fig-select-sm .vs__search,
.fig-select-sm .vs__selected {
    line-height: 1.4;
    font-size: 14px;
}
.fig-select-sm .vs__dropdown-menu {
    font-size: 14px;
}
.fig-select-sm .vs__dropdown-toggle {
    height: calc(1.3em + .2rem + 2px);
}

.fig-select-no-right-radius .vs__dropdown-toggle {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.fig-select .vs__clear {
    @apply flex items-center;
}

.fig-select-sm .vs__selected {
    margin: 2px 2px 2px 2px !important;
}

.fig-select-md .vs__selected {
    margin: 3px 2px 2px 2px !important;
}

/* the non-multiple select elements (vs--single) */
.vs--single.fig-select-sm .vs__selected,
.vs--single.fig-select-md .vs__selected {
    margin-top: 0 !important;
}


.fig-select-md .vs__dropdown-toggle {
    height: calc(1.6em + .2rem + 2px);
}

.fig-select-lg .vs__dropdown-toggle {
    height: calc(2.3em + .2rem + 2px);
}

/* state */
.fig-select.fig-form-control-state-success .vs__dropdown-toggle {
    @apply border-emerald-500;
}
.fig-select.fig-form-control-state-error .vs__dropdown-toggle {
    @apply border-red-500;
}
</style>
