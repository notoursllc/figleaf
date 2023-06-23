import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import enUs from '../locales/en-US.js';

export default {

    getI18nPlugin(config = {}) {
        return createI18n({
            legacy: false,
            globalInjection: true,
            locale: 'en-US',
            fallbackLocale: 'en-US',
            messages: {
                'en-US': enUs
            },
            ...config
        });
    },


    /**
     *
     * @param {*} composableFn  The composable function to load in the app.
     *                          Example: () => useMyComposable()
     */
    mockLoadComposableInApp( composableFn ) {
        let result;

        const app = createApp({
            setup() {
                result = composableFn();
                // suppress missing template warning
                return () => {};
            }
        });

        app.use( this.getI18nPlugin() );
        app.mount( document.createElement('div') );

        return result;
    }

}
