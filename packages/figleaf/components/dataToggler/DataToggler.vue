<script>
export default {
    name: 'DataToggler',

    props: {
        items: {
            type: Array,
            default() {
                return [];
            }
        }
    },

    data() {
        return {
            selectedItems: new Set(),

            // this is kind of a hack, but Vue cant detect changes in a Set object
            testSelected: [],
        }
    },

    computed: {
        numberSelected() {
            // return this.selectedItems.size;
            return this.testSelected.length;
        },

        allAreSelected() {
            return this.numberSelected === this.items.length;
        },

        someAreSelected() {
            return this.numberSelected > 0 && !this.allAreSelected;
        }
    },

    methods: {
        // part of the hack:
        mirrorSelectedItems() {
            setTimeout(() => {
                this.testSelected = [...this.selectedItems];
            });
        },

        emitChanged() {
            this.$emit('changed', this.selectedItems)
        },

        clear() {
            this.selectedItems.clear();

            this.mirrorSelectedItems();
            this.emitChanged();
        },

        addMultipleSelected(newItems) {
            if(newItems.length) {
                newItems.forEach((item) => {
                    this.selectedItems.add(item);

                    //test
                    this.testSelected.push(item);
                });

                this.mirrorSelectedItems();
                this.emitChanged();
            }
        },

        toggleOne(item, doAdd) {
            if(doAdd) {
                this.selectedItems.add(item);
            }
            else {
                if(this.selectedItems.has(item)) {
                    this.selectedItems.delete(item);
                }
            }

            this.mirrorSelectedItems();
            this.emitChanged();
        },

        toggleAll(selectAll) {
            if(selectAll) {
                this.addMultipleSelected(this.items);
            }
            else {
                this.clear();
            }
        }
    }
}
</script>


<template>
    <div>
        <slot
            :toggleAll="toggleAll"
            :toggleOne="toggleOne"
            :allAreSelected="allAreSelected"
            :someAreSelected="someAreSelected"
            :numberSelected="numberSelected"
            :clear="clear"
            :addMultipleSelected="addMultipleSelected"
            :selectedItems="selectedItems"></slot>
    </div>
</template>
