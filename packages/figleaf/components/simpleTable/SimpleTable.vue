<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'SimpleTable',

    props: {

    },

    data() {

    },

    watch: {

    },

    computed: {

    },

    methods: {

    }
});
</script>


<template>
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
            <table class="min-w-full">
                <thead>
                    <slot name="head"></slot>
                </thead>
                <tbody class="bg-white">
                    <slot name="body"></slot>
                </tbody>
            </table>
        </div>
    </div>
</template>


<style lang="postcss" scoped>

</style>
