<script>
export default {
    name: 'LabelValue',

    props: {
        valueClasses: {
            type: Array,
            default: () => {
                return [];
            }
        },

        required: {
            type: Boolean,
            default: false
        }
    }
};
</script>


<template>
    <div class="fig-lvg-row">
        <span v-if="$slots.label" class="fig-lvg-row-label"><slot name="label" /><span v-if="required" class="text-red-700">*</span></span>
        <span class="fig-lvg-row-value">
            <div><slot /></div>
            <div v-if="$slots.error" class="text-red-600 text-sm"><slot name="error" /></div>
        </span>
    </div>
</template>


<style>
.fig-lvg-row-value,
.fig-lvg-row-label {
    @apply align-top;
}


/* as block */
.fig-lvg-block .fig-lvg-row {
    @apply block;
}
.fig-lvg-block.fig-lvg-density-sm .fig-lvg-row {
    @apply mb-0;
}
.fig-lvg-block.fig-lvg-density-md .fig-lvg-row {
    @apply mb-2;
}
.fig-lvg-block.fig-lvg-density-lg .fig-lvg-row {
    @apply mb-4;
}
.fig-lvg-block.fig-lvg-density-xl .fig-lvg-row {
    @apply mb-6;
}
.fig-lvg-block.fig-lvg-row-value,
.fig-lvg-block.fig-lvg-row-label {
    @apply block;
}


/* as table */
.fig-lvg-table .fig-lvg-row {
    @apply table-row;
}
.fig-lvg-table .fig-lvg-row-label {
    @apply pr-2;
}

.fig-lvg-table.fig-lvg-density-sm .fig-lvg-row-value {
    @apply pb-0;
}
.fig-lvg-table.fig-lvg-density-md .fig-lvg-row-value {
    @apply pb-2;
}
.fig-lvg-table.fig-lvg-density-lg .fig-lvg-row-value {
    @apply pb-4;
}
.fig-lvg-table.fig-lvg-density-xl .fig-lvg-row-value {
    @apply pb-6;
}

.fig-lvg-table.fig-lvg-breakpoint-sm .fig-lvg-row-label,
.fig-lvg-table.fig-lvg-breakpoint-sm .fig-lvg-row-value {
    @apply block sm:table-cell;
}
.fig-lvg-table.fig-lvg-breakpoint-md .fig-lvg-row-label,
.fig-lvg-table.fig-lvg-breakpoint-md .fig-lvg-row-value {
    @apply block md:table-cell;
}
.fig-lvg-table.fig-lvg-breakpoint-lg .fig-lvg-row-label,
.fig-lvg-table.fig-lvg-breakpoint-lg .fig-lvg-row-value {
    @apply block lg:table-cell;
}
.fig-lvg-table .fig-lvg-breakpoint-xl .fig-lvg-row-label,
.fig-lvg-table .fig-lvg-breakpoint-xl .fig-lvg-row-value {
    @apply block xl:table-cell;
}


/* as row */
.fig-lvg-row .fig-lvg-row {
    @apply flex flex-col justify-start flex-nowrap border-r border-gray-300;
}
.fig-lvg-row .fig-lvg-row:last-child {
    @apply border-r-0;
}
.fig-lvg-row .fig-lvg-row-label {
    @apply text-gray-500;
}
.fig-lvg-row .fig-lvg-row-value {
    @apply mt-1 text-black;
}

.fig-lvg-row.fig-lvg-density-sm .fig-lvg-row {
    @apply px-2;
}
.fig-lvg-row.fig-lvg-density-md .fig-lvg-row {
    @apply px-4;
}
.fig-lvg-row.fig-lvg-density-lg .fig-lvg-row {
    @apply px-6;
}
.fig-lvg-row.fig-lvg-density-xl .fig-lvg-row {
    @apply px-8;
}
</style>
