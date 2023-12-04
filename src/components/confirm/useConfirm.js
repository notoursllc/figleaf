import { inject } from 'vue';

export default function useConfirm() {
    const show = inject('figShowConfirm');

    return {
        showConfirm: show
    }
}
