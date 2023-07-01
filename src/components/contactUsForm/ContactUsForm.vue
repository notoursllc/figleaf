<script>
export default {
    name: 'FigContactUsForm'
}
</script> 

<script setup>
import { reactive, computed, toRaw } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import FigLabelValueGroup from '../labelValueGroup/LabelValueGroup.vue';
import FigLabelValue from '../labelValueGroup/LabelValue.vue';
import FigFormText from '../form/text/FormText.vue';
import FigFormTextarea from '../form/textarea/FormTextarea.vue';
import FigButton from '../button/Button.vue';

const emit = defineEmits([
    'submit'
]);

const form = reactive({
    name: null,
    company: null,
    email: null,
    message: null,
});

const validatiorRules = computed(() => {
    return {
        name: { required },
        email: { required, email },
        message: { required },
    }
})
const v$ = useVuelidate(validatiorRules, form);

function onSubmit() {
    emit('submit', { ...toRaw(form) });
}
</script>


<template>
    <div class="text-left">
        <fig-label-value-group density="lg" block>
            <!-- Your name -->
            <fig-label-value required>
                <template v-slot:label>{{ $t('Your name') }}:</template>

                <fig-form-text
                    v-model="form.name"
                    maxlength="100"
                    @update:modelValue="v$.name.$touch()" />

                <template v-slot:error v-if="v$.name.$dirty && v$.name.required.$invalid">{{ $t('required') }}</template>
            </fig-label-value>

            <!-- Company -->
            <fig-label-value>
                <template v-slot:label>{{ $t('Company') }}:</template>

                <fig-form-text
                    v-model="form.company"
                    maxlength="100" />
            </fig-label-value>

            <!-- Email -->
            <fig-label-value required>
                <template v-slot:label>{{ $t('Email') }}:</template>

                <fig-form-text
                    v-model="form.email"
                    maxlength="100"
                    @update:modelValue="v$.email.$touch()" />

                <template v-slot:error v-if="v$.email.$dirty && v$.email.$invalid">
                    <div v-if="v$.email.required.$invalid">{{ $t('required') }}</div>
                    <div v-else-if="v$.email.email.$invalid">{{ $t('invalid email address format') }}</div>
                </template>
            </fig-label-value>

            <!-- Message -->
            <fig-label-value required>
                <template v-slot:label>{{ $t('Message') }}:</template>
                
                <fig-form-textarea
                    v-model="form.message"
                    maxlength="10000"
                    @update:modelValue="v$.message.$touch()" />

                <template v-slot:error v-if="v$.message.$dirty && v$.message.required.$invalid">{{ $t('required') }}</template>
            </fig-label-value>
        </fig-label-value-group>

        <div class="pt-5">
            <fig-button
                variant="primary"
                @click="onSubmit"
                :disabled="v$.$invalid"
                block
                size="lg">{{ $t('Submit') }}</fig-button>
        </div>
    </div>
</template>
