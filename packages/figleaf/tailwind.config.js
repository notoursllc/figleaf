const { getWhiteListClasses } = require('./components/grid/gridConfig');
const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './packages/figleaf/components/**/*.{vue,js,ts,jsx,tsx}',
        './packages/figleaf/layouts/**/*.{vue,js,ts,jsx,tsx}'
    ],
    // safelist: [
    //     ...getWhiteListClasses()
    // ],
    theme: {
        extend: {
            colors: {
                gray: colors.neutral
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms')
    ]
};
