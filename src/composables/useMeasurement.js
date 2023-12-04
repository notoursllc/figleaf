import useNumeric from './useNumeric.js';

export default function useMeasurement() {

    const { isNumeric } = useNumeric();

    function inchesToCentimeters(inches) {
        if(!isNumeric(inches)) {
            console.error(`inchesToCentimeters method was not given a numeric value: ${inches}`);
            return null;
        }

        const cm = inches * 2.54;
        return Math.round(cm * 100) / 100;
    }


    function centimetersToInches(cm) {
        if(!isNumeric(cm)) {
            console.error(`centimetersToInches method was not given a numeric value: ${cm}`);
            return null;
        }

        const inches = cm * 0.39370079;
        return Math.round(inches * 100) / 100;
    }

    return {
        inchesToCentimeters,
        centimetersToInches
    }
}
