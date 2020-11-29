<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'DropdownButton'
});
</script>


<template>
    <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
        <slot></slot>
    </a>
</template>
