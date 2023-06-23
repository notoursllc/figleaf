<script>
export default {
    name: 'ProductDetailsLayout'
}
</script>

<template>
    <div class="prod-wrap">
        <div class="block lg:flex lg:my-0 lg:mx-auto border border-gray-200 rounded-md bg-white">

            <!-- pics -->
            <div class="prod-pics" v-if="$slots.pics">
                <slot name="pics"></slot>
            </div>

            <div class="prod-details block px-3 md:px-6 md:py-4 grow">
                <!-- title -->
                <div v-if="$slots.title" class="text-3xl">
                    <slot name="title"></slot>
                </div>

                <!-- price -->
                <div v-if="$slots.price" class="text-base font-semibold mt-2">
                    <slot name="price"></slot>
                </div>

                <!-- thumbs -->
                <div v-if="$slots.thumbs" class="mt-4">
                    <slot name="thumbs"></slot>
                </div>

                <!-- sizes -->
                <div v-if="$slots.sizes" class="mt-4">
                    <slot name="sizes"></slot>
                </div>

                <!-- button -->
                <div v-if="$slots.button" class="mt-6">
                    <slot name="button"></slot>
                </div>

                <!-- description -->
                <div v-if="$slots.description" class="mt-6 break-normal text-base">
                    <slot name="description"></slot>
                </div>

                <!-- video -->
                <div v-if="$slots.video" class="mt-8">
                    <slot name="video"></slot>
                </div>

                <!-- youtube video -->
                <div v-if="$slots.youtube" class="mt-8">
                    <slot name="youtube"></slot>
                </div>

                <!-- artist -->
                <div v-if="$slots.artist" class="mt-8 break-normal text-base">
                    <slot name="artist"></slot>
                </div>
            </div>
        </div>

        <div v-if="$slots.under">
            <slot name="under"></slot>
        </div>
    </div>
</template>


<style>
.prod-pics {
    @apply overflow-hidden block;
}

@screen lg {
    .prod-pics {
        width: calc(100% - 456px);
    }

    .prod-details {
        width: 456px;
    }
}
</style>
