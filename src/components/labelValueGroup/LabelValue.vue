<script>
export default {
    name: 'LabelValue'
}
</script>


<script setup>
const props = defineProps({
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
});
</script>


<template>
    <div class="fig-lv">
        <span v-if="$slots.label" class="fig-lv-label"><slot name="label" /><span v-if="required" class="text-red-700">*</span></span>
        <span class="fig-lv-value">
            <div><slot /></div>
            <div v-if="$slots.error" class="text-red-600 text-sm"><slot name="error" /></div>
        </span>
    </div>
</template>


<style>
.fig-lv-value,
.fig-lv-label {
    @apply align-top;
}


/* as block */
.fig-lvg-block {
    .fig-lv {
        @apply block;
    }

    &.fig-lvg-density-sm .fig-lv {
        @apply mb-0;
    }
    &.fig-lvg-density-md .fig-lv {
        @apply mb-2;
    }
    &.fig-lvg-density-lg .fig-lv {
        @apply mb-4;
    }
    &.fig-lvg-density-xl .fig-lv {
        @apply mb-6;
    }

    &.fig-lv-value,
    &.fig-lv-label {
        @apply block;
    }
}

/* as table */
.fig-lvg-table {
    .fig-lv {
        @apply table-row;
    }

    .fig-lv-label {
        @apply pr-2;
    }

    &.fig-lvg-density-sm .fig-lv-label,
    &.fig-lvg-density-sm .fig-lv-value {
        @apply pb-0;
    }

    &.fig-lvg-density-md .fig-lv-label,
    &.fig-lvg-density-md .fig-lv-value {
        @apply pb-2;
    }

    &.fig-lvg-density-lg .fig-lv-label,
    &.fig-lvg-density-lg .fig-lv-value {
        @apply pb-4;
    }

    &.fig-lvg-density-xl .fig-lv-label,
    &.fig-lvg-density-xl .fig-lv-value {
        @apply pb-6;
    }

    &.fig-lvg-breakpoint-sm .fig-lv-label,
    &.fig-lvg-breakpoint-sm .fig-lv-value {
        @apply block sm:table-cell;
    }

    &.fig-lvg-breakpoint-md .fig-lv-label,
    &.fig-lvg-breakpoint-md .fig-lv-value {
        @apply block md:table-cell;
    }

    &.fig-lvg-breakpoint-lg .fig-lv-label,
    &.fig-lvg-breakpoint-lg .fig-lv-value {
        @apply block lg:table-cell;
    }

    &.fig-lvg-breakpoint-xl .fig-lv-label,
    &.fig-lvg-breakpoint-xl .fig-lv-value {
        @apply block xl:table-cell;
    }
}



/* .fig-lvg-table .fig-lv {
    @apply table-row;
} */
/* .fig-lvg-table .fig-lv-label {
    @apply pr-2;
}

.fig-lvg-table.fig-lvg-density-sm .fig-lv-value {
    @apply pb-0;
}
.fig-lvg-table.fig-lvg-density-md .fig-lv-value {
    @apply pb-2;
}
.fig-lvg-table.fig-lvg-density-lg .fig-lv-value {
    @apply pb-4;
}
.fig-lvg-table.fig-lvg-density-xl .fig-lv-value {
    @apply pb-6;
}

.fig-lvg-table.fig-lvg-breakpoint-sm .fig-lv-label,
.fig-lvg-table.fig-lvg-breakpoint-sm .fig-lv-value {
    @apply block sm:table-cell;
}
.fig-lvg-table.fig-lvg-breakpoint-md .fig-lv-label,
.fig-lvg-table.fig-lvg-breakpoint-md .fig-lv-value {
    @apply block md:table-cell;
}
.fig-lvg-table.fig-lvg-breakpoint-lg .fig-lv-label,
.fig-lvg-table.fig-lvg-breakpoint-lg .fig-lv-value {
    @apply block lg:table-cell;
}
.fig-lvg-table .fig-lvg-breakpoint-xl .fig-lv-label,
.fig-lvg-table .fig-lvg-breakpoint-xl .fig-lv-value {
    @apply block xl:table-cell;
} */


/* as row */
.fig-lvg-row {
    .fig-lv {
        @apply flex flex-col justify-start flex-nowrap border-r border-gray-300;
    }

    .fig-lv:last-child {
        @apply border-r-0;
    }
    .fig-lv-label {
        @apply text-gray-500;
    }
    .fig-lv-value {
        @apply mt-1 text-black;
    }

    &.fig-lvg-density-sm .fig-lv {
        @apply px-2;
    }
    &.fig-lvg-density-md .fig-lv {
        @apply px-4;
    }
    &.fig-lvg-density-lg .fig-lv {
        @apply px-6;
    }
    &.fig-lvg-density-xl .fig-lv {
        @apply px-8;
    }
}
</style>
