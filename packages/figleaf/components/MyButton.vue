<script>
export default {
    name: 'my-button',

    methods: {
        onClick() {
            this.$emit('click');
        }
    }
};
</script>

<template>
    <button class="button is-primary" @click="onClick">
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    border: 1px solid red;
    border-radius: 3px;
    background-color: #ffffff;
    cursor: pointer;
    font-size: 15pt;
    padding: 3px 10px;
    margin: 10px;
}
</style>
