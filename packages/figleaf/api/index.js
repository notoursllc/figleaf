export default ($axios) => {

    const api = {};

    // GET
    api.get = (url, params) => {
        const config = null;

        if(params) {
            config = { params }
        }

        return $axios.get(url, config);
    };

    api.$get = (url, params) => {
        const { data } = api.get(url, params);
        return data;
    };
    // api.$$get = (url, params) => {
    //     const { data } = api.$get(url, params);
    //     return data;
    // };


    // POST
    api.post = (url, params) => {
        return $axios.post(url, params);
    };

    api.$post = async (url, params) => {
        const { data } = await api.post(url, params);
        return data;
    };

    // api.$$post= async (url, params) => {
    //     const { data } = await api.$post(url, params);
    //     return data;
    // };


    // PUT
    api.put = async (url, params) => {
        return $axios.put(url, params);
    };

    api.$put = async (url, params) => {
        const { data } = await api.put(url, params);
        return data;
    };

    // api.$$put = async (url, params) => {
    //     const { data } = await api.$put(url, params);
    //     return data;
    // };


    // DELETE
    api.delete = (url, params) => {
        const config = null;

        if(params) {
            config = { params }
        }

        return $axios.delete(url, config);
    };

    api.$delete = async (url, params) => {
        const { data } = await api.delete(url, params);
        return data;
    };

    // api.$$delete = async (url, params) => {
    //     const { data } = await api.$delete(url, params);
    //     return data;
    // };


    // MISC
    api.getCancelToken = () => {
        const { CancelToken } = $axios;
        return CancelToken
    };

    api.getCancelTokenSource = () => {
        return $axios.CancelToken.source();
    };


    // CART
    api.cart = {
        get(params) {
            return api.$get('/cart', params)
        },

        list(params) {
            const paramString = queryString.stringify(params, { arrayFormat: 'bracket' });
            return api.$get(`/carts?${paramString}`) // TODO: is there a XSS issue here?
        },

        update(data) {
            return api.$post('/cart/upsert', data)
        },

        refundCartItems(cart_items, refund_sales_tax) {
            return api.$post('/cart/items/refund', {
                cart_items,
                refund_sales_tax
            });
        },

        shipped(cartId, isShipped) {
            return api.$post('/cart/shipped', {
                id: cartId,
                shipped: !!isShipped
            });
        },

        item: {
            add(data) {
                return api.$post('/cart/item', data);
            },

            update(data) {
                return api.$put('/cart/item', data)
            },

            delete(params) {
                return api.$delete('/cart/item', params);
            }
        },

        order: {
            get(id) {
                return api.$get('/cart/order', {
                    id: id
                })
            },

            resendConfirmationEmail(cartId) {
                return api.$post('/cart/order/resend-confirmation', {
                    id: cartId
                });
            }
        },

        shipping: {
            setAddress(data) {
                return api.$post('/cart/shippingaddress', data);
            },

            getEstimates(cartId) {
                return api.$post('/cart/shipping/estimate', {
                    id: cartId
                });
            },

            selectRate(cartId, rateId) {
                return api.$post('/cart/shipping/rate', {
                    id: cartId,
                    rate_id: rateId
                });
            },

            purchaseLabel(cartId) {
                return api.$post('/cart/shipping/label', {
                    id: cartId
                });
            },
        },

        payment: {
            get(cartId) {
                return api.$get('/cart/payment', {
                    id: cartId
                });
            },

            intent(cartId) {
                return api.$post('/cart/payment/intent', {
                    id: cartId
                });
            },

            success(cartId, paymentIntentId) {
                return api.$post('/cart/payment', {
                    id: cartId,
                    stripe_payment_intent_id: paymentIntentId
                });
            },

            paypal: {
                create(cartId) {
                    return api.$post('/cart/payment/paypal', {
                        id: cartId
                    });
                },

                execute(cartId, paymentToken) {
                    return api.$put('/cart/payment/paypal', {
                        id: cartId,
                        token: paymentToken
                    });
                }
            }
        }
    }

    return api;
}
