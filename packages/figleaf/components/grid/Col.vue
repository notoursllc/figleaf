<script>
export default {
    name: 'FigCol',

    inject: [
        'gridState'
    ],

    computed: {
        classNames() {
            return this.gridState.colClasses;
        }
    }
};
</script>


<template>
    <div :class="classNames"><slot></slot></div>
</template>
