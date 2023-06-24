<script>
export default {
    name: 'FigAddressForm'
}
</script>

<script setup>
import { computed, ref, reactive, onMounted, watch } from 'vue';
import { email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import FigFormText from '../form/text/FormText.vue';
import FigFormGroup from '../form/group/FormGroup.vue';
import FigSelectCountry from '../selectCountry/SelectCountry.vue';
import FigSelectStateProvince from '../selectStateProvince/SelectStateProvince.vue';
import FigIcon from '../icon/FigIcon.vue';
import FigIconLabel from '../iconLabel/IconLabel.vue';
import FigFormSelectNative from '../form/selectNative/FormSelectNative.vue';
import FigTooltip from '../tooltip/Tooltip.vue';
import FigRequired from '../form/required/Required.vue';

import {
    addressFormRequiredProps,
    addressFormInputSizes,
    addressFormRowSpacing
} from './constants';


const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    },

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    streetAddress: {
        type: String
    },

    extendedAddress: {
        type: String
    },

    city: {
        type: String
    },

    state: {
        type: String
    },

    postalCode: {
        type: String
    },

    company: {
        type: String
    },

    countryCodeAlpha2: {
        type: String
    },

    phone: {
        type: String
    },

    email: {
        type: String
    },

    is_gift: {
        type: Boolean
    },

    stripe: {
        type: Object,
        required: true
    },

    required: {
        type: Array,
        default() {
            return Object.keys(addressFormRequiredProps);
        }
    },

    inputSize: {
        type: String,
        default: addressFormInputSizes.lg,
        validator: (value) => Object.keys(addressFormInputSizes).includes(value)
    },

    hidePhone: {
        type: Boolean
    },

    hideEmail: {
        type: Boolean
    },

    hideGift: {
        type: Boolean
    },

    rowSpacing: {
        type: [Number, String],
        default: 1,
        validator: (value) => addressFormRowSpacing.includes(parseInt(value, 10))
    },

    cellSpacing: {
        type: [Number, String],
        default: 2,
        validator: (value) => addressFormRowSpacing.includes(parseInt(value, 10))
    }
});

const emit = defineEmits([
    'update:firstName',
    'update:lastName',
    'update:streetAddress',
    'update:extendedAddress',
    'update:city',
    'update:state',
    'update:postalCode',
    'update:company',
    'update:countryCodeAlpha2',
    'update:phone',
    'update:email',
    'update:is_gift',
    'invalid'
])

const addressFormLoading = ref(true);
const showExtraInputs = ref(false);
const form = reactive({
    firstName: props.firstName,
    lastName: props.lastName,
    streetAddress: props.streetAddress,
    extendedAddress: props.extendedAddress,
    city: props.city,
    state: props.state,
    postalCode: props.postalCode,
    countryCodeAlpha2: props.countryCodeAlpha2,
    phone: props.phone,
    email: props.email,
    is_gift: props.is_gift
});

const requiredProps = computed(() => {
    const reqd = [ ...props.required ];

    if(props.hidePhone && reqd.includes('phone')) {
        reqd.splice(reqd.indexOf('phone'), 1);
    }

    if(props.hideEmail && reqd.includes('email')) {
        reqd.splice(reqd.indexOf('email'), 1);
    }

    return reqd;
});

const vuelidateRules = computed(() => {
    const baseValidation = {};

    for (let prop in form) {
        if (requiredProps.value.includes(prop)) {
            baseValidation[prop] = { required };
        }
    }

    baseValidation.email = requiredProps.value.includes('email') ? {...baseValidation.email, email } : { email };

    return baseValidation;
});

const v$ = useVuelidate(vuelidateRules, form);

function emitAllForm() {
    for(let prop in form) {
        emit(`update:${prop}`, form[prop]);
    }
}

function canShowRequiredMsg(attr) {
    return v$.value[attr]?.$dirty && v$.value[attr]?.required.$invalid;
}

function inputState(attr) {
    if(!v$[attr] || !v$[attr].$dirty) {
        return null;
    }

    switch(attr) {
        case 'email':
            return !v$[attr].email ? false : null;

        default:
            if(!v$[attr].required) {
                return false;
            }
            return null;
    }
}


function touchV(prop, value) {
    v$.value[prop]?.$touch();
    emit(`update:${prop}`, value);
}

async function initAddressForm() {
    const elements = props.stripe.elements({
        loader: 'always',
        // locale: '' // https://edge.stripe.com/docs/js/appendix/supported_locales?type=cvc_update
        appearance: {
            // theme: 'stripe',
            // variables: {
            //     colorPrimary: '#0570de',
            //     colorBackground: '#ffffff',
            //     colorBackgroundDeemphasize10: 'red',
            //     colorText: '#30313d',
            //     colorDanger: '#df1b41',
            //     fontFamily: 'Ideal Sans, system-ui, sans-serif',
            //     spacingUnit: '4px',
            //     borderRadius: '4px',
            // }
            theme: 'none',
            rules: {
                '.Tab': {
                    border: '1px solid #E0E6EB',
                    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
                },

                '.Tab:hover': {
                    color: 'var(--colorText)',
                },

                '.Tab--selected': {
                    borderColor: '#E0E6EB',
                    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
                },

                '.Input': {
                    border: '1px solid #cccccc',
                    borderRadius: '2px',
                },
                '.Input--invalid': {
                    boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)',
                },
            }
        }
    });

    // https://stripe.com/docs/js/elements_object/create_address_element#address_element_create-options
    const addressElement = elements.create('address', {
        mode: 'shipping',
        autocomplete: {
            mode: 'automatic'
        },
        blockPoBox: true,
        fields: {
            phone: 'always',
            // email: 'always',
        },
        validation: {
            phone: {
                required: 'always',
            },
            // email: {
            //     required: 'always',
            // },
        },
        display: {
            name: 'split'
        },
        defaultValues: {
            // name: 'Jane Doe',
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            address: {
                line1: form.streetAddress,
                line2: form.extendedAddress,
                city: form.city,
                state: form.state,
                postal_code: form.postalCode,
                country: form.countryCodeAlpha2,
            }
        }
    });

    addressElement.mount("#address-element");
    addressFormLoading.value = false;

    addressElement.on('change', (event) => {
        console.log("ON CHANGE", event)

        if(event.value.address.line1) {
            showExtraInputs.value = true;
        }

        if (event.complete) {
            // Extract potentially complete address
            const address = event.value.address;
            form.firstName = event.value.firstName;
            form.lastName = event.value.lastName;
            form.phone = event.value.phone;

            form.streetAddress = address.line1;
            form.extendedAddress = address.line2;
            form.city = address.city;
            form.state = address.state;
            form.postalCode = address.postal_code;
            form.countryCodeAlpha2 = address.country;

            emitAllForm()
            emit('invalid', v$.value.$invalid ? true : false);
        }
        else {
            emit('invalid', true);
        }
    })
}

onMounted(() => {
    initAddressForm();
});

watch(
    () => props.firstName,
    (newVal) => {
        form.firstName = newVal;
    }
)

watch(
    () => props.lastName,
    (newVal) => {
        form.lastName = newVal;
    }
)

watch(
    () => props.streetAddress,
    (newVal) => {
        form.streetAddress = newVal;
    }
)

watch(
    () => props.extendedAddress,
    (newVal) => {
        form.extendedAddress = newVal;
    }
)

watch(
    () => props.city,
    (newVal) => {
        form.city = newVal;
    }
)

watch(
    () => props.state,
    (newVal) => {
        form.state = newVal;
    }
)

watch(
    () => props.postalCode,
    (newVal) => {
        form.postalCode = newVal;
    }
)

watch(
    () => props.countryCodeAlpha2,
    (newVal) => {
        form.countryCodeAlpha2 = newVal;
    }
)

watch(
    () => props.company,
    (newVal) => {
        form.company = newVal;
    }
)

watch(
    () => props.phone,
    (newVal) => {
        form.phone = newVal;
    }
)

watch(
    () => props.is_gift,
    (newVal) => {
        form.is_gift = newVal;
    }
)

watch(
    () => v$.value.$invalid,
    (newVal) => {
        emit('invalid', newVal);
    }
)
</script>


<template>
    <div class="grid grid-cols-1 gap-2">
        <div class="grid grid-cols-2 gap-4">
            <!-- first name -->
            <fig-form-group>
                <template v-slot:label>
                    <span class="fig-address-label">{{ $t('First name') }}</span>
                    <fig-required v-if="requiredProps.includes('firstName')" />
                </template>

                <fig-form-text
                    v-model.trim="form.firstName"
                    :size="inputSize"
                    @update:modelValue="(val) => touchV('firstName', val)"
                    :state="inputState('firstName')"
                    class="w-full" />

                <template v-slot:error>
                    <div v-show="canShowRequiredMsg('firstName')">{{ $t('Required') }}</div>
                </template>
            </fig-form-group>

            <!-- last name -->
            <fig-form-group>
                <template v-slot:label>
                    <span class="fig-address-label">{{ $t('Last name') }}</span>
                    <fig-required v-if="requiredProps.includes('lastName')" />
                </template>

                <fig-form-text
                    v-model.trim="form.lastName"
                    :size="inputSize"
                    @update:modelValue="(val) => touchV('lastName', val)"
                    :state="inputState('lastName')"
                    class="w-full" />

                <template v-slot:error>
                    <div v-show="canShowRequiredMsg('lastName')">{{ $t('Required') }}</div>
                </template>
            </fig-form-group>
        </div>

        <!-- street address -->
        <fig-form-group>
            <template v-slot:label>
                <span class="fig-address-label">{{ $t('Address line 1') }}</span>
                <fig-required v-if="requiredProps.includes('streetAddress')" />
            </template>

            <fig-form-text
                v-model.trim="form.streetAddress"
                :size="inputSize"
                @update:modelValue="(val) => touchV('streetAddress', val)"
                :state="inputState('streetAddress')"
                class="w-full" />

            <template v-slot:error>
                <div v-show="canShowRequiredMsg('streetAddress')">{{ $t('Required') }}</div>
            </template>
        </fig-form-group>

        <!-- extended address -->
        <fig-form-group>
            <template v-slot:label>
                <span class="fig-address-label">{{ $t('Address line 2') }}</span>
                <fig-required v-if="requiredProps.includes('extendedAddress')" />
            </template>

            <fig-form-text
                v-model.trim="form.extendedAddress"
                :size="inputSize"
                @update:modelValue="(val) => touchV('extendedAddress', val)"
                :state="inputState('extendedAddress')"
                class="w-full" />

            <template v-slot:error>
                <div v-show="canShowRequiredMsg('extendedAddress')">{{ $t('Required') }}</div>
            </template>
        </fig-form-group>

        <!-- country -->
        <fig-form-group>
            <template v-slot:label>
                <span class="fig-address-label">{{ $t('Country') }}</span>
                <fig-required v-if="requiredProps.includes('countryCodeAlpha2')" />
            </template>

            <fig-select-country
                v-model.trim="form.countryCodeAlpha2"
                :size="inputSize"
                @update:modelValue="(val) => touchV('countryCodeAlpha2', val)"
                :state="inputState('countryCodeAlpha2')"
                :clearable="false"
                class="w-full" />

            <template v-slot:error>
                <div v-show="canShowRequiredMsg('countryCodeAlpha2')">{{ $t('Required') }}</div>
            </template>
        </fig-form-group>


        <div
            class="grid grid-cols-3 gap-4"
            v-cloak
            v-show="form.countryCodeAlpha2">
            <!-- city -->
            <fig-form-group>
                <template v-slot:label>
                    <span class="fig-address-label">{{ $t('City') }}</span>
                    <fig-required v-if="requiredProps.includes('city')" />
                </template>

                <fig-form-text
                    v-model.trim="form.city"
                    :size="inputSize"
                    @update:modelValue="(val) => touchV('city', val)"
                    :state="inputState('city')"
                    class="w-full" />

                <template v-slot:error>
                    <div v-show="canShowRequiredMsg('city')">{{ $t('Required') }}</div>
                </template>
            </fig-form-group>

            <!-- state -->
            <fig-form-group>
                <template v-slot:label>
                    <span class="fig-address-label">{{ $t('State/Province/Region') }}</span>
                    <fig-required v-if="requiredProps.includes('state')" />
                </template>

                <fig-select-state-province
                    :country="form.countryCodeAlpha2"
                    v-model.trim="form.state"
                    :clearable="false"
                    class="w-full"
                    :size="inputSize"
                    @update:modelValue="(val) => touchV('state', val)" />

                <template v-slot:error>
                    <div v-show="canShowRequiredMsg('state')">{{ $t('Required') }}</div>
                </template>
            </fig-form-group>

            <!-- zip -->
            <fig-form-group>
                <template v-slot:label>
                    <span class="fig-address-label">{{ $t('Postal code') }}</span>
                    <fig-required v-if="requiredProps.includes('postalCode')" />
                </template>

                <fig-form-text
                    v-model.trim="form.postalCode"
                    :size="inputSize"
                    @update:modelValue="(val) => touchV('postalCode', val)"
                    :state="inputState('postalCode')"
                    class="w-full" />

                <template v-slot:error>
                    <div v-show="canShowRequiredMsg('postalCode')">{{ $t('Required') }}</div>
                </template>
            </fig-form-group>
        </div>

        <div
            class="grid grid-cols-2 gap-4"
            v-if="!hideEmail || !hidePhone">
            <!-- email -->
            <fig-form-group v-if="!hideEmail">
                <template v-slot:label>
                    <span class="fig-address-label">{{ $t('Email') }}</span>
                    <fig-required v-if="requiredProps.includes('email')" />
                </template>

                <fig-form-text
                    v-model.trim="form.email"
                    type="email"
                    :size="inputSize"
                    @update:modelValue="(val) => touchV('email', val)"
                    :state="inputState('email')"
                    class="w-full" />

                <template v-slot:error>
                    <div v-show="canShowRequiredMsg('email')">{{ $t('Required') }}</div>
                    <div v-if="v$.email?.email.$invalid">{{ $t('Please enter a valid email address.') }}</div>
                </template>
            </fig-form-group>

            <!-- phone number -->
            <fig-form-group v-if="!hidePhone">
                <template v-slot:label>
                    <span class="fig-address-label">{{ $t('Phone number') }}</span>
                    <fig-required v-if="requiredProps.includes('phone')" />
                </template>

                <fig-form-text
                    v-model.trim="form.phone"
                    :size="inputSize"
                    @update:modelValue="(val) => touchV('phone', val)"
                    :state="inputState('phone')"
                    class="w-full" />

                <template v-slot:error>
                    <div v-show="canShowRequiredMsg('phone')">{{ $t('Required') }}</div>
                </template>
            </fig-form-group>
        </div>

        <div v-if="!hideGift">
            <fig-form-group>
                <template v-slot:label>
                    <fig-icon-label>
                        <template v-slot:left>
                            <fig-icon
                                icon="gift"
                                :height="22"
                                :width="22"
                                :stroke-width="1.5" />
                        </template>
                        <span class="fig-address-label">{{ $t('Is this order a gift?') }}</span>
                    </fig-icon-label>
                    <fig-required v-if="requiredProps.includes('is_gift')" />
                </template>

                <div class="flex items-center gap-1">
                    <fig-form-select-native
                        v-model.trim="form.is_gift"
                        :options="[
                            { label: $t('No'), value: false },
                            { label: $t('Yes'), value: true }
                        ]"
                        @update:modelValue="(val) => touchV('is_gift', val)" />

                    <fig-tooltip :centered="false">
                        <template v-slot:toggler>
                            <fig-icon
                                icon="info-circle"
                                :height="24"
                                :width="24" />
                        </template>
                        {{ $t('is_gift_tooltip') }}
                    </fig-tooltip>
                </div>

                <template v-slot:error>
                    <div v-show="canShowRequiredMsg('is_gift')">{{ $t('Required') }}</div>
                </template>
            </fig-form-group>
        </div>
    </div>
</template>


<style scoped>
.fig-address-label {
    @apply  text-gray-600 text-sm;
}
</style>
