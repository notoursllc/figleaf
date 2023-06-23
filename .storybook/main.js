module.exports = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-interactions"
    ],
    framework: {
        name: "@storybook/vue3-vite",
        options: {}
    },
    features: {
        storyStoreV7: true
    },
    docs: {
        autodocs: true
    }
};
