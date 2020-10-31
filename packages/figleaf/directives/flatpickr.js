import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

export default {
    inserted: function (el, binding, vnode) {
        el._flatpickr = new Flatpickr(el, binding.value);
    },

    unbind: (el) => {
        el._flatpickr.destroy();
    }
};
