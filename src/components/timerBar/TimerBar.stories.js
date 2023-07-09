import { ref } from 'vue';
import { FigTimerBar, FigButton } from '../../../index.js';

export default {
    title: 'Components/TimerBar',
    component: FigTimerBar,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigTimerBar,
        FigButton
    },
    setup() {
        const timerBar = ref(null);

        function onStart() {
            console.log('start');
        };

        function onCancel() {
            console.log('cancel');
        };

        function onDone() {
            console.log('done');
        };

        return {
            timerBar,
            onStart,
            onCancel,
            onDone,
            args
        };
    },
    template: `
        <div>
            <fig-timer-bar 
                ref="timerBar" 
                v-bind="args"
                @start="onStart"
                @cancel="onCancel"
                @done="onDone" />

            <div class="mt-10">
                <fig-button @click="timerBar.start(5000)" class="mr-4">Start</fig-button>
                <fig-button @click="timerBar.cancel()">Stop</fig-button>
            </div>
        </div>
    `
});

export const TimerBar = Template.bind({});
TimerBar.args = {
    height: '20px',
    rounded: true,
    autostart: true
};
