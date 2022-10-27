import { FigPhotoManager } from '../../index.js';

export default {
    title: 'Components/PhotoManager',

    component: FigPhotoManager,

    argTypes: {

    }
};


const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigPhotoManager
    },
    template: '<fig-photo-manager v-bind="$props" />'
});

export const PhotoManager = Template.bind({});
PhotoManager.storyName = "Photo Manager"
PhotoManager.args = {
};
