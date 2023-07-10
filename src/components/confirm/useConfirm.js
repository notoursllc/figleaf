import { inject } from 'vue';

export default function useToaster() {
    const show = inject('figShowConfirm');

    return {
        showConfirm: show
    }
}