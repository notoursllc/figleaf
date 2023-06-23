const path = require('path');
const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        path.join(__dirname, './components/**/*.{vue,js,ts,jsx,tsx}'),
        path.join(__dirname, './layouts/**/*.{vue,js,ts,jsx,tsx}'),
        path.join(__dirname, './composables/**/*.{vue,js,ts,jsx,tsx}'),
        path.join(__dirname, './directives/**/*.{vue,js,ts,jsx,tsx}'),
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
