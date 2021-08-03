<script>
import Vue from 'vue';
import JsonTree from 'vue-json-tree';

Vue.component('json-tree', JsonTree);

export default {
    name: 'JsonTreeView',

    render(h) {
        return h(
            JsonTree,
            {
                props: this.$props,
                on: this.$listeners,
                attrs: this.$attrs
            }
        );
    }
};
</script>
