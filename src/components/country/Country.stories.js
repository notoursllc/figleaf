import { FigCountry } from '../../../index.js';
import useCountry from './useCountry.js';

const { getCountries } = useCountry();
const countries = getCountries();

export default {
    title: 'Components/Country',
    component: FigCountry,
    argTypes: {
        alpha2: {
            control: { type: 'select' },
            options: Object.keys(countries)
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigCountry
    },
    setup() {
        return { args };
    },
    template: `
        <fig-country v-bind="args" />
    `
});

export const Country = Template.bind({});
Country.args = {
    alpha2: 'US'
};

