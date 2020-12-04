import Vue from 'vue';
import Confirm from './Confirm.vue';

export default () => {

    Vue.component('FigConfigm', Confirm);

    Vue.prototype.$confirm = (config) => {
        Confirm.show(config);
    };

};
