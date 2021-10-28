<template>
    <div class="p-tabview-panel" role="tabpanel" v-show="d_active">
        <slot></slot>
    </div>
</template>

<script>
// This component was copied from https://raw.githubusercontent.com/primefaces/primevue/9431e0486c49a70fcb6e00cfa70b18457518608d/src/components/tabpanel/TabPanel.vue
export default {
    name: 'tabpanel',
    props: {
        header: null,
        active: Boolean,
        disabled: Boolean
    },
    data() {
        return {
            d_active: this.active
        }
    },
    watch: {
        active(newValue) {
            this.d_active = newValue;
        }
    },
    mounted() {
        if (!this.$parent.tabs.includes(this)) {
            this.$parent.tabs.push(this);
        }
    },
    beforeDestroy() {
        this.$parent.tabs = this.$parent.tabs.filter(tab => tab !== this);
    }
}
</script>
