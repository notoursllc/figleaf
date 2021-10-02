<script>
import DataTableCell from './DataTableCell.vue';

export default {
    name: 'DataTableColumn',

    components: {
        DataTableCell
    },

    props: {
        field: {
            type: String,
        },

        label: {
            type: String
        },

        row: {
            type: Object,
            default() {
                return {}
            }
        },

        sortable: {
            type: Boolean,
            default: false
        }
    },

    // inject: ['columns'],

    data() {
        return {
            gregtest: 'foo'
        }
    },

    computed: {
        rowData() {
            if(this.row.hasOwnProperty(this.field)) {
                return this.row[this.field];
            }
            return null
        }
    },

    mounted() {
        console.log("DTC mounted", this.columns)
        if(this.label) {
            this.columns.push(this.$props)
        }
    }
}
</script>


<template>
    <div>
        <slot name="label"></slot>
        <slot name="cell" v-bind:greg="{foo: 'foo'}"></slot>
    </div>
</template>

