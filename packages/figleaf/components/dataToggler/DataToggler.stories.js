import FigDataToggler from './DataToggler.vue';
import FigFormCheckbox from '../form/checkbox/FormCheckbox.vue';
import FigTableSimple from '../tableSimple/TableSimple.vue';
import FigTh from '../tableSimple/Th.vue';
import FigTr from '../tableSimple/Tr.vue';
import FigTd from '../tableSimple/Td.vue';


export default {
    title: 'Components/DataToggler',

    component: FigDataToggler,

    argTypes: {
    }
};


const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigDataToggler,
        FigFormCheckbox
    },
    data() {
        return {
            sampleData: [
                { one: 1, two: 2, three: 3 },
                { four: 4, five: 5, six: 6 },
                { seven: 7, eight: 8, nine: 9 }
            ]
        }
    },
    template: `
        <fig-data-toggler :items="sampleData" v-slot:default="slotProps">
            <div>
                <!--
                <input
                    type="checkbox"
                    class="form-checkbox fig-form-control"
                    @click="(e) => { slotProps.toggleAll(e.target.checked) }"
                    :checked="slotProps.allAreSelected">
                -->

                <fig-form-checkbox
                    inline
                    @input="(isChecked) => slotProps.toggleAll(isChecked)"
                    v-model="slotProps.allAreSelected" />
            </div>

            <div class="mt-6" >
                <div v-for="(item, idx) in sampleData" :key="idx">
                    <fig-form-checkbox
                        inline
                        @input="(isChecked) => slotProps.toggleOne(item, isChecked)"
                        :value="slotProps.selectedItems.has(item)">{{ item }} {{ slotProps.selectedItems.has(item) }}</fig-form-checkbox>

                    <!--
                    <label>
                        <input
                            type="checkbox"
                            class="form-checkbox fig-form-control"
                            @change="(e) => slotProps.toggleOne(item, e.target.checked)"
                            :checked="slotProps.selectedItems.has(item)">
                        {{ item }}
                    </label>
                    -->
                </div>
            </div>

            <div class="mt-6">
                <div>Some are selected: {{ slotProps.someAreSelected }}</div>
                <div>All are selected: {{ slotProps.allAreSelected }}</div>
                <div># selected: {{ slotProps.numberSelected }}</div>
                <div>Selected items: {{ [...slotProps.selectedItems] }}</div>
            </div>
        </fig-data-toggler>
    `
});

export const DataToggler = Template.bind({});
DataToggler.args = {
};



const WithTableTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigDataToggler,
        FigFormCheckbox,
        FigTableSimple,
        FigTr,
        FigTh,
        FigTd
    },
    data() {
        return {
            shirts: [
                { size: 'sm', color: 'red' },
                { size: 'md', color: 'green' },
                { size: 'lg', color: 'blue' }
            ]
        }
    },
    template: `
        <fig-data-toggler :items="shirts" v-slot:default="slotProps">
            <fig-table-simple>
                <template v-slot:head>
                    <fig-tr>
                        <!-- select all checkbox -->
                        <fig-th class="w-5">
                            <fig-form-checkbox
                                inline
                                @input="(isChecked) => slotProps.toggleAll(isChecked)"
                                v-model="slotProps.allAreSelected" />

                            <!--
                            <input
                                type="checkbox"
                                class="form-checkbox fig-form-control"
                                @click="(e) => { slotProps.toggleAll(e.target.checked) }"
                                :checked="slotProps.allAreSelected"> slotProps.allAreSelected {{ slotProps.allAreSelected }}
                            -->
                        </fig-th>

                        <fig-th>Size</fig-th>
                        <fig-th>Color</fig-th>
                    </fig-tr>
                </template>

                <fig-tr v-for="(item, idx) in shirts" :key="idx">
                    <fig-td>
                        <input
                            type="checkbox"
                            class="form-checkbox fig-form-control"
                            @change="(e) => slotProps.toggleOne(item, e.target.checked)"
                            :checked="slotProps.selectedItems.has(item)">
                    </fig-td>
                    <fig-td>{{ item.size }}</fig-td>
                    <fig-td>{{ item.color }}</fig-td>
                </fig-tr>
            </fig-table-simple>
        </fig-data-toggler>
    `
});

export const with_table = WithTableTemplate.bind({});
WithTableTemplate.args = {
    items: [
        { size: 'sm', color: 'red' },
        { size: 'md', color: 'green' },
        { size: 'lg', color: 'blue' }
    ]
};
