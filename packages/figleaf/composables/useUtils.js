import isDate from 'lodash.isdate';

export default function useUtils() {

    function parseInt2(num, defaultValue) {
        const val = parseInt(num, 10);

        if(isNaN(val)) {
            return defaultValue !== undefined ? defaultValue : null;
        }

        return val;
    }


    function daysFromNow(d) {
        if(!isDate(d)) {
            console.warn('A Date object was not passed to daysFromNow()');
            return 0;
        }

        const now = new Date();
        return  Math.round((d - now) / (1000 * 60 * 60 * 24));  // round the amount of days
    }


    return {
        parseInt2,
        daysFromNow
    }

}
