import { ref } from 'vue';
import { FigImageManager } from '../../../index.js';

export default {
    title: 'Components/ImageManager',
    component: FigImageManager,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigImageManager
    },
    setup() {
        const images = ref([]);

        function onAdd(val) {
            console.log("ON ADD", val)

            // test
            setTimeout(() => {
                images.value.push({
                    id: images.value.length,
                    alt_text: `ALT text ${images.value.length}`,
                    ordinal: images.value[images.value.length - 1]?.ordinal || 1,
                    url: `foo${images.value.length}.png`,
                    loading: false
                })
            }, 3000)
        }

        function onUpdate(val) {
            console.log("ON UPDATE", val)
        }

        function onDelete(val) {
            console.log("ON DELETE", val)
        }

        return {
            args,
            images,
            onAdd,
            onUpdate,
            onDelete
        };
    },
    template: `
        <div>
            <fig-image-manager
                v-bind="args"
                v-model="images"
                @update:modelValue="onUpdate"
                @add="onAdd"
                @delete="onDelete" />

            <div class="mt-10">
                model: {{ images }}
            </div>
        </div>
    `
});

export const ImageManager = Template.bind({});
ImageManager.args = {
    // accept: [
    //     'image/png'
    // ],
    maxNumImages: 3,
    tagFirstAsPrimary: true
};

