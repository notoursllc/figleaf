export default function useNumeric() {

    function round(num, decimals = 0) {
        const parsed = parseFloat(num);

        if (isNaN(parsed)) {
            return num;
        }

        return Math.round(parsed * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }

    return {
        round
    }
}
