import { ref, reactive, computed } from '@vue/composition-api';

export default function useDataToggler() {
    const selectedItems = reactive(new Set());
    const allItems = ref([]);

    const numberSelected = computed(() => selectedItems.size);
    const allAreSelected = computed(() => numberSelected.value === allItems.value.length)
    const someAreSelected = computed(() => numberSelected.value > 0 && !allAreSelected.value);

    function clear() {
        selectedItems.clear();
    }

    function addMultipleSelected(newItems) {
        if(newItems.length) {
            newItems.forEach((item) => {
                selectedItems.add(item);
            });
        }
    }

    function toggleOne(item, doAdd) {
        if(doAdd) {
            selectedItems.add(item);
        }
        else {
            if(selectedItems.has(item)) {
                selectedItems.delete(item);
            }
        }
    }

    function toggleAll(selectAll) {
        if(selectAll) {
            addMultipleSelected(allItems.value);
        }
        else {
            clear();
        }
    }

    function setAllCandidates(items) {
        allItems.value = items;
    }

    return {
        selectedItems,
        toggleOne,
        toggleAll,
        clear,
        addMultipleSelected,
        setAllCandidates,
        numberSelected,
        allAreSelected,
        someAreSelected
    }

}
