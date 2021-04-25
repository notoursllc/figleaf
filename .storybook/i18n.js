import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enUS from '../packages/figleaf/locales/en-US';

Vue.use(VueI18n);

const messages = {
    'en-US': enUS
}

export default new VueI18n({
    locale: 'en-US', // set locale
    messages, // set locale messages
});
