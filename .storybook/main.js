module.exports = {
    "stories": [
        "../packages/figleaf/**/*.stories.mdx",
        "../packages/figleaf/**/*.stories.@(js|jsx|ts|tsx)",

        // the example stories:
        "../stories/**/*.stories.mdx",
        "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",

        // tailwind 3.x requires postcss 8
        // this forces the usage of postcss 8 (the version defined in package.json):
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        }
    ]
}
