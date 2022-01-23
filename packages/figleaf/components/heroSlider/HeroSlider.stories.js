import FigHeroSlider from './HeroSlider.vue';

export default {
    title: 'Components/HeroSlider',

    component: FigHeroSlider,

    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigHeroSlider
    },
    template: `
        <div style="height: 80vh">
            <fig-hero-slider v-bind="$props" />
        </div>
    `
});

export const HeroSlider = Template.bind({});
HeroSlider.args = {
    options: {
        autoplay: false
    },
    heros: [
        {
            title: '111',
            caption: 'caption 111 caption 111 caption 111 caption 111 caption 111 caption 111 caption 111 caption 111 caption 111 caption 111 caption 111 caption 111 caption 111 ',
            // url: '/images/1642402260652-shirt_team_4.jpg'
            url: 'http://image.tmdb.org/t/p/w1280/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg'
        },
        // {
        //     title: '2222',
        //     caption: 'caption 2222',
        //     url: '/images/1642402237925-shirt_team_3.jpg'
        // }
    ]
};

