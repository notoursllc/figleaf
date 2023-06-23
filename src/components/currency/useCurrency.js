export default function useCurrency() {

    function limitDecimalPrecision(n, p) {
        // shift the dot n positions to the right by multiplying your number by 10 in power of p (10**p)
        const shift = 10**p;

        // cut off what's left after dot, using bitwise OR (|) that implicitly turns the float into integer
        // NOte that we could have also used parseInt() to convert the float to an integer
        // https://www.delftstack.com/howto/javascript/javascript-float-to-int/

        // divide the result by 10 in power of p to shift the dot p positions back to the left
        const result = (0 | (n*shift)) / shift;

        // Note: this has an edge case where floats that are whole numbers (3) or have all zeros after
        // the dot (3.00) will return as 3... the desired 'precision' will not be maintained.
        // Doing `result.toFixed(p)` will maintain the precision BUT return the value as a string
        // (Number.prototype.toFixed() returns a string) which is not desired because it prevents addition
        // '3.00' + 2 = '3.002'
        return result;
    }


    /**
     * Multiplies the price by the exchange rate
     * @param integer price     The 'cents' price (whole number)
     * @param {*} exchangeRate
     * @returns integer
     */
    function exchangeRatePrice(price, exchangeRate) {
        if(price !== null) {
            let p = parseInt(price, 10);

            if(p && !isNaN(p)) {
                if(exchangeRate) {
                    p = p * exchangeRate;
                }

                // toFixed(0) will round the value based on the last decimal (1.49 => 1, 1.5 => 2) and return a string value
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed

                // parseInt will return the numeric value ('1' => 1)
                return parseInt(p.toFixed(0), 10);
            }
        }

        return null;
    }


    /*
    * Note that cart.sub_total can not be used because that value
    * is the sum of all USD values (in cents... whole numbers).
    * Applying exchange rates however will result in fractional values,
    * and the sum of those fractional values, taking into account that each fractional
    * value is rounded to the hundredths place, will not necessarily equal the
    * cart.sub_total value * exchange rate.
    * For example:
    *
    * USD:
    * per item: 1100 ($11.00 is the visual display)
    * 5 (qty) * $11.00 = $55
    *
    * EUR:
    * per item: 1100 * 0.979436 = 1077.3796 (€10.77 is the visual display)
    * 5 (qty) * €10.77 = €53.85
    * However, the cart.sub_total value (5500) * exchange rate (0.979436) = 5386.898
    * which will have a visual display of €53.86 ...off by 1 cent
    */
    function cartSubTotal(cart, exchangeRate = 1) {
        let subtotal = 0;

        if(Array.isArray(cart?.cart_items)) {
            cart.cart_items.forEach((item) => {
                const price = exchangeRatePrice(
                    item.product_variant_sku?.display_price,
                    exchangeRate
                );
                const qty = item.qty || 0;

                subtotal += qty * price;
            });
        }

        return subtotal;
    }

    return {
        limitDecimalPrecision,
        exchangeRatePrice,
        cartSubTotal
    }

}
