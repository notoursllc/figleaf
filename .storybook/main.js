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
        "@storybook/addon-postcss",
    ]
}
