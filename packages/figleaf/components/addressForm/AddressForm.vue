<script>
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import isObject from 'lodash.isobject';
import { email, required } from 'vuelidate/lib/validators';
import FigFormText from '../form/text/FormText';
import FigFormGroup from '../form/group/FormGroup';
import FigButton from '../button/Button';
import FigSelectCountry from '../selectCountry/SelectCountry';
import FigSelectStateProvince from '../selectStateProvince/SelectStateProvince';
import FigIcon from '../icon/FigIcon';
import FigIconLabel from '../iconLabel/IconLabel';
import FigFormSelectNative from '../form/selectNative/FormSelectNative.vue';
import FigTooltip from '../tooltip/Tooltip.vue';
import FigRequired from '../form/Required.vue';

import {
    addressFormRequiredProps,
    addressFormInputSizes,
    addressFormRowSpacing
} from './constants';

Vue.use(Vuelidate);


export default {
    name: 'AddressForm',

    props: {
        value: {
            type: Object,
            required: true
        },

        required: {
            type: Array,
            default() {
                return Object.keys(addressFormRequiredProps);
            }
            // default: Object.keys(addressFormRequiredProps)
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
    },

    components: {
        FigButton,
        FigFormText,
        FigFormGroup,
        FigSelectCountry,
        FigSelectStateProvince,
        FigIcon,
        FigIconLabel,
        FigFormSelectNative,
        FigTooltip,
        FigRequired
    },

    data: function() {
        return {
        };
    },

    validations: function() {
        return this.validationObject;
    },

    computed: {
        rowClasses() {
            return `flex flex-wrap -mx-${this.cellSpacing}`;
        },

        oneColCellClasses() {
            return `w-full mb-${this.rowSpacing} px-${this.cellSpacing}`;
        },

        twoColCellClasses() {
            return `w-full mb-${this.rowSpacing} px-${this.cellSpacing} sm:w-1/2`;
        },

        threeColCellClasses() {
            return `w-full mb-${this.rowSpacing} px-${this.cellSpacing} sm:w-1/3`;
        },

        requiredProps() {
            const reqd = [ ...this.required ];

            if(this.hidePhone && reqd.includes('phone')) {
                reqd.splice(reqd.indexOf('phone'), 1);
            }

            if(this.hideEmail && reqd.includes('email')) {
                reqd.splice(reqd.indexOf('email'), 1);
            }

            return reqd;
        },

        validationObject() {
            const baseValidation = {};

            const props = [
                'firstName',
                'lastName',
                'streetAddress',
                'extendedAddress',
                'city',
                'state',
                'postalCode',
                'countryCodeAlpha2',
                'phone',
                'email'
            ];

            props.forEach((prop) => {
                if(this.requiredProps.includes(prop)) {
                    baseValidation[prop] = { required };
                }
            });

            baseValidation.email = this.requiredProps.includes('email') ? {...baseValidation.email, email } : { email };

            return {
                value: baseValidation
            };
        }
    },

    methods: {
        canShowValidationMsg(attr) {
            if(!this.$v.value.hasOwnProperty(attr) || !this.$v.value[attr].$dirty) {
                return false;
            }

            const attrValidations = this.validationObject.value[attr];
            let canShow = false;

            if(isObject(attrValidations)) {
                Object.keys(attrValidations).forEach((key) => {
                    if(!this.$v.value[attr][key]) {
                        canShow = true;
                    }
                });
            }

            return canShow;
        },

        inputState(attr) {
            if(!this.$v.value[attr] || !this.$v.value[attr].$dirty) {
                return null;
            }

            switch(attr) {
                case 'email':
                    return !this.$v.value.email.email ? false : null;

                default:
                    if(!this.$v.value[attr].required) {
                        return false;
                    }
                    return null;
            }
        },

        touchV(prop, value) {
            if(this.$v.value[prop]) {
                this.$v.value[prop].$touch();
            }

            this.$emit('input', { ...this.value, [prop]: value });
        }
    },

    watch: {
        '$v.value.$invalid': {
            handler: function(newVal) {
                this.$emit('invalid', newVal);
            },
            immediate: true
        }
    }
};
</script>

<template>
    <div>



        <div :class="rowClasses">
            <!-- first name -->
            <div :class="twoColCellClasses">
                <fig-form-group>
                    <template v-slot:label>
                        <span class="fig-address-label">{{ $t('First name') }}</span>
                        <fig-required />
                    </template>
                    <fig-form-text
                        v-model.trim="value.firstName"
                        :size="inputSize"
                        @input="(val) => touchV('firstName', val)"
                        :state="inputState('firstName')" />

                    <div slot="error" v-show="canShowValidationMsg('firstName')">{{ $t('Required') }}</div>
                </fig-form-group>
            </div>

            <!-- last name -->
            <div :class="twoColCellClasses">
                <fig-form-group>
                    <template v-slot:label>
                        <span class="fig-address-label">{{ $t('Last name') }}</span>
                        <fig-required />
                    </template>
                    <fig-form-text
                        v-model.trim="value.lastName"
                        :size="inputSize"
                        @input="(val) => touchV('lastName', val)"
                        :state="inputState('lastName')" />

                    <div slot="error" v-show="canShowValidationMsg('lastName')">{{ $t('Required') }}</div>
                </fig-form-group>
            </div>
        </div>


        <!-- country -->
        <div :class="rowClasses">
            <div :class="oneColCellClasses">
                <fig-form-group>
                    <template v-slot:label>
                        <span class="fig-address-label">{{ $t('Country') }}</span>
                        <fig-required />
                    </template>

                    <fig-select-country
                        v-model.trim="value.countryCodeAlpha2"
                        :size="inputSize"
                        @input="(val) => touchV('countryCodeAlpha2', val)"
                        :state="inputState('countryCodeAlpha2')"
                        :clearable="false" />

                    <div slot="error" v-show="canShowValidationMsg('countryCodeAlpha2')">{{ $t('Required') }}</div>
                </fig-form-group>
            </div>
        </div>

        <template v-if="value.countryCodeAlpha2">
            <!-- street address -->
            <div :class="rowClasses">
                <div :class="oneColCellClasses">
                    <fig-form-group>
                        <template v-slot:label>
                            <span class="fig-address-label">{{ $t('Address line 1') }}</span>
                            <fig-required />
                        </template>
                        <fig-form-text
                            v-model.trim="value.streetAddress"
                            :size="inputSize"
                            @input="(val) => touchV('streetAddress', val)"
                            :state="inputState('streetAddress')" />

                        <div slot="error" v-show="canShowValidationMsg('streetAddress')">{{ $t('Required') }}</div>
                    </fig-form-group>
                </div>
            </div>

            <!-- extended address -->
            <div :class="rowClasses">
                <div :class="oneColCellClasses">
                    <fig-form-group>
                        <template v-slot:label>
                            <span class="fig-address-label">{{ $t('Address line 2') }}</span>
                        </template>
                        <fig-form-text
                            v-model.trim="value.extendedAddress"
                            :size="inputSize"
                            @input="(val) => touchV('extendedAddress', val)"
                            :state="inputState('extendedAddress')" />

                        <div slot="error" v-show="canShowValidationMsg('extendedAddress')">{{ $t('Required') }}</div>
                    </fig-form-group>
                </div>
            </div>

            <div :class="rowClasses" v-cloak v-show="value.countryCodeAlpha2 && !canShowValidationMsg('countryCodeAlpha2')">
                <!-- city -->
                <div :class="threeColCellClasses">
                    <fig-form-group>
                        <template v-slot:label>
                            <span class="fig-address-label">{{ $t('City') }}</span>
                            <fig-required />
                        </template>

                        <fig-form-text
                            v-model.trim="value.city"
                            :size="inputSize"
                            @input="(val) => touchV('city', val)"
                            :state="inputState('city')" />

                        <div slot="error" v-show="canShowValidationMsg('city')">{{ $t('Required') }}</div>
                    </fig-form-group>
                </div>

                <!-- state -->
                <div :class="threeColCellClasses">
                    <fig-form-group>
                        <template v-slot:label>
                            <span class="fig-address-label">{{ $t('State/Province/Region') }}</span>
                            <fig-required />
                        </template>

                        <fig-select-state-province
                            :country="value.countryCodeAlpha2"
                            v-model.trim="value.state"
                            :clearable="false"
                            class="w-full "
                            :size="inputSize"
                            @input="(val) => touchV('state', val)" />
                        <!-- <fig-select-state-province
                            :country="value.countryCodeAlpha2"
                            v-model.trim="value.state"
                            :clearable="false"
                            class="w-full"
                            :placeholder="$t('State/Province/Region')"
                            :size="inputSize"
                            @input="(val) => touchV('state', val)"
                            :state="value.countryCodeAlpha2 && inputState('state')" /> -->

                        <!-- <div slot="error" v-show="value.countryCodeAlpha2 && canShowValidationMsg('state')">{{ $t('Required') }}</div> -->
                    </fig-form-group>
                </div>

                <!-- zip -->
                <div :class="threeColCellClasses">
                    <fig-form-group>
                        <template v-slot:label>
                            <span class="fig-address-label">{{ $t('Postal code') }}</span>
                            <fig-required />
                        </template>

                        <fig-form-text
                            v-model.trim="value.postalCode"
                            :size="inputSize"
                            @input="(val) => touchV('postalCode', val)"
                            :state="inputState('postalCode')" />

                        <div slot="error" v-show="canShowValidationMsg('postalCode')">{{ $t('Required') }}</div>
                    </fig-form-group>
                </div>
            </div>
        </template>

        <div :class="rowClasses" v-if="!hideEmail || !hidePhone">
            <!-- email -->
            <div :class="twoColCellClasses" v-if="!hideEmail">
                <fig-form-group>
                    <template v-slot:label>
                        <span class="fig-address-label">{{ $t('Email') }}</span>
                        <fig-required />
                    </template>

                    <fig-form-text
                        v-model.trim="value.email"
                        type="email"
                        :size="inputSize"
                        @input="(val) => touchV('email', val)"
                        :state="inputState('email')" />

                    <div slot="error" v-show="canShowValidationMsg('email')">
                        <div v-if="$v.value.email.hasOwnProperty('required') && !$v.value.email.required">{{ $t('Required') }}</div>
                        <div v-if="!$v.value.email.email">{{ $t('Please enter a valid email address.') }}</div>
                    </div>
                </fig-form-group>
            </div>

            <!-- phone number -->
            <div :class="twoColCellClasses" v-if="!hidePhone">
                <fig-form-group>
                    <template v-slot:label>
                        <span class="fig-address-label">{{ $t('Phone number') }}</span>
                        <fig-required />
                    </template>

                    <fig-form-text
                        v-model.trim="value.phone"
                        :size="inputSize"
                        @input="(val) => touchV('phone', val)"
                        :state="inputState('phone')" />

                    <div slot="error" v-show="canShowValidationMsg('phone')">{{ $t('Required') }}</div>
                </fig-form-group>
            </div>
        </div>

        <div class="pt-2" v-if="!hideGift">
            <fig-form-group :stacked="false">
                <template v-slot:label>
                    <fig-icon-label>
                        <template v-slot:left>
                            <fig-icon
                                icon="gift"
                                :height="22"
                                :width="22"
                                :stroke-width="1.5" />
                        </template>
                        {{ $t('Is this order a gift?') }}
                    </fig-icon-label>
                </template>
                <div class="pl-2">
                    <fig-form-select-native
                        v-model.trim="value.is_gift"
                        :options="[
                            { label: $t('No'), value: false },
                            { label: $t('Yes'), value: true }
                        ]" />

                    <fig-tooltip :centered="false">
                        <template slot="toggler">
                            <div class="pl-1">
                                <fig-icon
                                    icon="info-circle"
                                    :height="20"
                                    :width="20" />
                            </div>
                        </template>
                        {{ $t('is_gift_tooltip') }}
                    </fig-tooltip>
                </div>
            </fig-form-group>
        </div>
    </div>
</template>


<style scoped>
.fig-address-label {
    @apply  text-gray-600 text-sm;
}
</style>
