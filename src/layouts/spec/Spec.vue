<script>
export default {
    name: 'FigSpec'
};
</script>


<template>
    <div class="fig-spec">
        <div class="fig-spec-label"><slot name="label"></slot></div>
        <div class="fig-spec-content"><slot></slot></div>
    </div>
</template>


<style>
.fig-spec {
    @apply block mt-2 w-full;
}

.fig-spec-label {
    @apply block align-top pt-2 pr-2 pb-1 pl-0 break-words font-medium text-base text-gray-500 px-5 border-b border-gray-300;
}

.fig-spec-content {
    @apply block align-top py-2 pr-5 pl-2 w-full;
}

@screen sm {
    .fig-spec {
        @apply table-row;
    }

    .fig-spec-layout .fig-spec:nth-child(even) {
        @apply bg-gray-100;
    }

    .fig-spec-label {
        @apply text-base table-cell p-5 align-top border-b-0 border-r;
    }

    .fig-spec-content {
        @apply table-cell p-5 align-top;
    }
}
</style>
