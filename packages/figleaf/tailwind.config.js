const { getWhiteListClasses } = require('./components/grid/gridConfig');

module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: [
            'components/**/*.vue'
            // 'layouts/**/*.vue',
            // 'pages/**/*.vue',
            // 'plugins/**/*.js',
            // 'nuxt.config.js'
            // TypeScript
            // 'plugins/**/*.ts',
            // 'nuxt.config.ts'
        ],
        options: {
            whitelist: getWhiteListClasses()
        }
    },
    theme: {
        extend: {
            colors: {
                // using the warm gray colors from 2.0
                // https://github.com/tailwindlabs/tailwindcss/blob/b3ed7248c218f4c56834e1114d4070ceb21b51fb/colors.js
                gray: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    350: '#cdcdcd', // custom
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717'
                }
            }
        }
    },
    variants: {},
    plugins: [
        require('@tailwindcss/custom-forms')
    ]
};
