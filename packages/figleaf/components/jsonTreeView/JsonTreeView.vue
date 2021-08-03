<script>
import Vue from 'vue';
import JsonTree from 'vue-json-tree';

Vue.component('json-tree', JsonTree);

export default {
    name: 'JsonTreeView'
};
</script>


<template>
    <json-tree v-bind="$attrs" />
</template>
