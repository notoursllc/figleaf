<script>
    export default {
        name: 'PackingSlipLayout',

        props: {

        }
    };
</script>


<template>
    <div class="fig-packing-slip-layout">
        <!-- header-->
        <div class="flex items-center">
            <div class="text-xl font-semibold">{{ $t('Packing slip') }}</div>
            <div class="flex-grow flex justify-end"><slot name="logo" /></div>
        </div>

        <!-- addresses -->
        <div class="grid grid-cols-3 gap-4 w-full mt-6">
            <!-- shipping address -->
            <div>
                <div class="text-gray-400 text-sm mt-1">{{ $t('Ship to') }}:</div>
                <slot name="address_shipping" />
            </div>

            <!-- billing address -->
            <div>
                <template v-if="$slots.address_billing">
                    <div class="text-gray-400 text-sm mt-1">{{ $t('Bill to') }}:</div>
                    <slot name="address_billing" />
                </template>
            </div>

            <!-- return address-->
            <div>
                <template v-if="$slots.address_returns">
                    <div class="text-gray-400 text-sm mt-1">{{ $t('Returns') }}:</div>
                    <slot name="address_returns" />
                </template>
            </div>

            <!-- order date -->
            <div>
                <div class="text-gray-400 text-sm mt-1">{{ $t('Order date') }}:</div>
                <slot name="order_date" />
            </div>

            <!-- order number -->
            <div class="col-span-2">
                <div class="text-gray-400 text-sm mt-1">{{ $t('Order number') }}:</div>
                <slot name="order_number" />
            </div>

            <div></div>
        </div>

        <!-- items list table -->
        <div class="mt-8">
            <slot></slot>
        </div>

        <!-- footer -->
        <div class="mt-8">
            <slot name="footer" />
        </div>
    </div>
</template>
