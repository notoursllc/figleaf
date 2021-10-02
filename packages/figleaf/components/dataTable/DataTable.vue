<script>
import DataTableSimple from './DataTableSimple.vue';

export default {
    components: {
        DataTableSimple
    },

    props: {
        items: {
            type: Array
        }
    },

    data() {
        return {
            columnOrder: []
        }
    },

    render(h) {
        console.log("DEF SLOT", this.$slots.default);

        const thChildren = [];

        // Maps maintain the order that the keys were added in
        const columnOrder = new Map();

        if(Array.isArray(this.$slots.default)) {
            this.$slots.default.forEach((Vnode) => {
                console.log("VNODE", Vnode?.componentOptions?.tag)

                if(Vnode?.componentOptions?.tag === 'fig-data-table-column') {
                    const thSlot = Vnode.data?.scopedSlots?.th;

                    if(typeof thSlot === 'function' || Vnode?.componentOptions?.propsData?.label) {
                        const thContent = typeof thSlot === 'function'
                                    ? thSlot()
                                    : Vnode?.componentOptions?.propsData?.label

                        thChildren.push(
                            h(
                                'th',
                                {
                                    attrs: { ...Vnode.data.attrs },
                                    class: Vnode.data.staticClass,
                                    style: Vnode.data.staticStyle,
                                },
                                thContent
                            )
                        );

                        columnOrder.set(
                            Vnode?.componentOptions?.propsData?.field,
                            Vnode.data?.scopedSlots?.td
                        );
                    }
                }
            })
        }

        // build the TDs
        const tBodyRows = [];

        this.items.forEach((obj) => {
            const rowChildren = [];

            for (let [key, value] of  columnOrder.entries()) {
                rowChildren.push(
                    h(
                        'td',
                        {},
                        typeof value === 'function' ? value(obj) : obj[key]
                    )
                )
            }

            tBodyRows.push(
                h(
                    'tr',
                    {},
                    rowChildren
                )
            );
        });

        return h(
            DataTableSimple,
            {
                class: 'fig-data-table',
                scopedSlots: {
                    thead: function (props) {
                        return h(
                            'tr',
                            {},
                            thChildren
                        );
                    },
                    tbody: function (props) {
                        return tBodyRows
                    }
                }
            },
            []
        );
    }
}
</script>


<style scoped>
.fig-data-table,
.fig-data-table td {
    @apply border border-2 border-gray-300;
}
</style>
