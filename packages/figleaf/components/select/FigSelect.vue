<script>
import Vue from 'vue';
import vSelect from 'vue-select';
import FigIcon from '../icon/FigIcon';

// https://vue-select.org/guide/components.html#setting-globally-at-registration
vSelect.props.components.default = () => ({
    Deselect: {
        render: (h) => {
            h(
                FigIcon,
                {
                    attrs: {
                        icon: 'x',
                        width: 20,
                        height: 20,
                        'stroke-width': 1
                    }
                }
            );
        }
    },
    OpenIndicator: {
        render: (h) => {
            h(
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
});

export default Vue.extend({
    name: 'FigSelect',

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
        }
    },

    computed: {
        classNames() {
            return [
                'fig-select',
                `fig-select-${this.size}`
            ];
        }
    }
});
</script>

<template>
    <v-select
        :class="classNames"
        v-bind="$attrs"
        v-on="$listeners">
        <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
    </v-select>
</template>

<style lang="scss">
.fig-select {
    .fig-icon-chevron-down {
        margin-top: -3px;
    }
}
</style>


