<script>

export default {
    name: 'Address',

    props: {
        firstName: {
            type: String
        },

        lastName: {
            type: String
        },

        company: {
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

        zip: {
            type: String
        },

        countryCode: {
            type: String
        },

        countryCodeInline: {
            type: Boolean,
            default: false
        },

        email: {
            type: String
        },

        phone: {
            type: String
        }
    },


    computed: {
        formattedName() {
            const val = [];

            if(this.firstName) {
                val.push(this.firstName.trim());
            }

            if(this.lastName) {
                val.push(this.lastName.trim());
            }

            return val.join(' ');
        },

        formattedCompanyName(name) {
            if(this.company) {
                return this.company.trim().toUpperCase();
            }

            return null;
        },

        formattedCityStateZip() {
            const val = [];

            if(this.city) {
                val.push(this.city.trim());
            }

            if(this.state || this.zip) {
                if(this.city.trim()) {
                    val.push(',');
                }

                if(this.state) {
                    val.push(' ' + this.state.trim());
                }

                if(this.zip) {
                    // make sure zip is a string before trimming
                    const z = this.zip + '';
                    val.push(' ' + z.trim());
                }
            }

            if(this.countryCodeInline && this.countryCode) {
                if(
                    (this.city && this.city.trim())
                    || (this.state && this.state.trim())
                    || (this.zip && this.zip.trim())
                ) {
                    val.push(',');
                }
                val.push(this.countryCode);
            }

            return val.join('');
        }
    }
};
</script>

<template>
    <div>
        <div class="addressRow">{{ formattedName }}</div>
        <div class="addressRow" v-if="formattedCompanyName">{{ formattedCompanyName }}</div>
        <div class="addressRow" v-if="streetAddress">{{ streetAddress }}</div>
        <div class="addressRow" v-if="extendedAddress">{{ extendedAddress }}</div>
        <div class="addressRow">{{ formattedCityStateZip }}</div>
        <div class="addressRow" v-if="countryCode && !countryCodeInline" >{{ countryCode }}</div>
        <div class="addressRow" v-if="email">{{ email }}</div>
        <div v-if="phone">{{ phone }}</div>
    </div>
</template>

<style scoped>
.addressRow {
    margin-bottom: 2px;
}
</style>
