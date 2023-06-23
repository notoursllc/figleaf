import { FigAddress } from '../../../index.js';

export default {
    title: 'Components/Address',
    component: FigAddress,
    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigAddress
    },
    setup() {
        return { args };
    },
    template: '<fig-address v-bind="args" />'
});

export const Address = Template.bind({});
Address.args = {
    firstName: 'Bob',
    lastName: 'LaBla',
    company: 'My company',
    streetAddress: '123 Abc St.',
    city: 'San Mateo',
    state: 'CA',
    zip: '94402',
    countryCode: 'US',
    email: 'greg@greg.com',
    phone: '650-867-5309'
};

