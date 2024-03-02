import { ref } from 'vue';

export default function useLoading() {

    const loading = ref(false);

    function startLoading() {
        loading.value = true;
    }

    function stopLoading() {
        loading.value = false;
    }

    return {
        loading,
        startLoading,
        stopLoading
    }

}
