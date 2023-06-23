import { FigUseTime } from '../../index.js';

export default {
    title: 'Composables/UseTime',
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
        const { getTimezone, getCountryFromTimezone } = FigUseTime();
        const timezone = getTimezone();
        const country = getCountryFromTimezone();

        return {
            args,
            timezone,
            country
        };
    },
    template: `
        <div>
            <div>Your timezone: {{ timezone }}</div>
            <div>Your country: {{ country }}</div>
        </div>
    `
});

export const UseTime = Template.bind({});
UseTime.args = {
};

