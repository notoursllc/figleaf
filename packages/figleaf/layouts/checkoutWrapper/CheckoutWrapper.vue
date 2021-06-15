<script>
export default {
    name: 'CheckoutWrapper'
};
</script>


<template>
    <div class="checkout-wrap">
        <slot />
    </div>
</template>


<style>
.checkout-wrap {
    @apply mx-auto;
    max-width: 1100px;
}
</style>
