<script>
import Vue from 'vue';
import vSelect from 'vue-select';
import FigIcon from '../icon/FigIcon';
import 'vue-select/src/scss/vue-select.scss';


export default Vue.extend({
    name: 'FormSelect',

    components: {
        vSelect
    },

    props: {
        size: {
            type: String,
            default: 'md',
            validator: (value) => {
                return ['sm', 'md', 'lg'].includes(value);
            }
        },

        rightRadius: {
            type: Boolean,
            default: true
        }
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
                `fig-select-${this.size}`
            ];

            if(!this.rightRadius) {
                names.push('fig-select-no-right-radius');
            }

            return names;
        }
    }
});
</script>


<template>
    <v-select
        :components="{Deselect, OpenIndicator}"
        :class="classNames"
        v-bind="$attrs"
        v-on="$listeners">
        <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
    </v-select>
</template>


<style lang="scss">
.fig-select {
    background-color: #fff;

    .fig-icon.vs__open-indicator {
        fill: none;
    }

    .vs__clear .fig-icon-x {
        margin-top: -3px;
    }
}

.fig-select-sm {
    .vs__search,
    .vs__selected {
        line-height: 1.4;
        font-size: 14px;
    }
    .vs__dropdown-menu {
        font-size: 14px;
    }
}

.fig-select-no-right-radius {
    .vs__dropdown-toggle {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
}
</style>