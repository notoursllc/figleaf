import { getCurrentInstance } from 'vue';

export default function useConfirm() {
    const vm = getCurrentInstance()
    return vm.appContext.config.globalProperties.$figConfirm;
}
