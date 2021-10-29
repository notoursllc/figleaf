import isObject from 'lodash-es/isObject';
import cloneDeep from 'lodash-es/cloneDeep';
import queryString from 'query-string';


function formatParams(params) {
    return queryString.stringify(
        params,
        { arrayFormat: 'bracket' }
    );
}

export default ($axios) => {

    const api = {};

    // GET
    api.get = (url, params) => {
        let config = null;

        if(params) {
            config = { params }
        }

        return $axios.get(url, config);
    };

    api.$get = async (url, params) => {
        const { data } = await api.get(url, params);
        return data;
    };


    // POST
    api.post = (url, params) => {
        return $axios.post(url, params);
    };

    api.$post = async (url, params) => {
        const { data } = await api.post(url, params);
        return data;
    };


    // PUT
    api.put = (url, params) => {
        return $axios.put(url, params);
    };

    api.$put = async (url, params) => {
        const { data } = await api.put(url, params);
        return data;
    };


    // DELETE
    api.delete = (url, params) => {
        let config = null;

        if(params) {
            config = { params }
        }

        return $axios.delete(url, config);
    };

    api.$delete = async (url, params) => {
        const { data } = await api.delete(url, params);
        return data;
    };


    // MISC
    api.getCancelToken = () => {
        const { CancelToken } = $axios;
        return CancelToken
    };

    api.getCancelTokenSource = () => {
        return $axios.CancelToken.source();
    };


    api.cart = {
        get(params) {
            return api.$get('/cart', params)
        },

        list(params) {
            return api.$get(`/carts?${formatParams(params)}`) // TODO: is there a XSS issue here?
        },

        update(data) {
            return api.$post('/cart/upsert', data)
        },

        refund(data) {
            return api.$post('/cart/refund', data);
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
            },


        },

        order: {
            get(id) {
                return api.$get('/cart/order', { id })
            },

            resendConfirmationEmail(id) {
                return api.$post('/cart/order/resend-confirmation', { id });
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

            purchaseLabel(id) {
                return api.$post('/cart/shipping/label', { id });
            },

            selectRate(cartId, rateId) {
                return api.$post('/cart/shipping/rate', {
                    id: cartId,
                    rate_id: rateId
                });
            },

            isShipped(cartId, isShipped) {
                return api.$post('/cart/shipped', {
                    id: cartId,
                    shipped: !!isShipped
                });
            }
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
    };


    api.masterType = {
        all(params) {
            return api.$get(`/master_types/all?${formatParams(params)}`); // TODO: is there a XSS issue here?
        },

        delete(id) {
            return api.$delete('/master_type', { id });
        },

        get(id) {
            return api.$get('/master_type', {
                searchParams: {
                    id
                }
            })
        },

        list(params) {
            return api.$get(`/master_types?${formatParams(params)}`); // TODO: is there a XSS issue here?
        },

        ordinals(data) {
            return api.$put('/master_types/ordinal', data);
        },

        upsert(data) {
            return api[data.hasOwnProperty('id') ? '$put' : '$post']('/master_type', data);
        },

        getNextAvailableTypeValue(allTypes) {
            let highestValue = 0;

            // find the highest value
            allTypes.forEach((obj) => {
                if(obj.value > highestValue) {
                    highestValue = obj.value;
                }
            });

            let factor = 0;

            if(highestValue) {
                factor = parseInt(Math.log(highestValue) / Math.log(2), 10); // current factor
                factor++; // what the new factor should be
            }

            return Math.pow(2, factor);
        }
    };


    api.media = {
        addImage(File) {
            const formData = new FormData();
            formData.append('file', File);

            return api.$post('/media/image', formData);
        }
    };


    api.packageType = {
        stripRelations(data) {
            delete data.volume_cm;
        },

        all(params) {
            return api.$get(`/package_types/all?${formatParams(params)}`);
        },

        delete(id) {
            return api.$delete('/package_type', { id });
        },

        list(params) {
            return api.$get(`/package_types?${formatParams(params)}`);
        },

        ordinals(data) {
            return api.$put('/package_types/ordinal', data);
        },


        upsert(data) {
            const type = cloneDeep(data);
            api.packageTypes.stripRelations(type);

            return api[data.hasOwnProperty('id') ? '$put' : '$post']('/package_type', type);
        }
    };


    api.product = {
        stripRelations(data) {
            delete data.created_at;
            delete data.updated_at;
            delete data.deleted_at;
            delete data.total_inventory_count;
            delete data.packing_volume_cm;

            if(Array.isArray(data.variants)) {
                data.variants.forEach((variant) => {
                    delete variant.display_price;
                    delete variant.is_displayable;
                    delete variant.total_inventory_count;

                    if(Array.isArray(variant.images)) {
                        variant.images.forEach((img) => {
                            delete img.loading;
                            delete img.media;
                        });
                    }

                    if(Array.isArray(variant.skus)) {
                        variant.skus.forEach((sku) => {
                            delete sku.final_price;
                            delete sku.display_price;
                        });
                    }

                });
            }
        },

        delete(id) {
            return api.$delete('/product', { id });
        },

        list(params) {
            // Example params object:
            // See BaseController.queryHelper() for all attributes
            // ============================
            // {
            // where: ['is_available', '=', true],
            // whereRaw: ['sub_type & ? > 0', [productTypeId]],
            // andWhere: [
            //     ['total_inventory_count', '>', 0]
            // ],
            // }
            return api.$get(`/products?${formatParams(params)}`);
        },

        get(id, options) {
            return api.$get('/product', {
                id,
                ...(isObject(options) ? options : {})
            });
        },

        upsert(data) {
            const prod = cloneDeep(data);
            api.product.stripRelations(prod);

            return api[prod.id ? '$put' : '$post']('/product', prod);
        },

        accentMessage: {
            all(params) {
                return api.$get(`/product/accent_messages/all?${formatParams(params)}`);
            },

            get(id) {
                return api.$get('/product/accent_message', { id });
            },

            delete(id) {
                return api.$delete('/product/accent_message', { id });
            },

            list(params) {
                return api.$get(`/product/accent_messages?${formatParams(params)}`);
            },

            upsert(props) {
                return api[props.id ? '$put' : '$post']('/product/accent_message', props);
            },
        },

        collection: {
            stripRelations(data) {
                delete data.created_at;
                delete data.updated_at;
                delete data.deleted_at;
            },

            get(id) {
                return api.$get('/product/collection', { id });
            },

            delete(id) {
                return api.$delete('/product/collection', { id });
            },

            list(params) {
                return api.$get(`/product/collections?${formatParams(params)}`);
            },

            upsert(data) {
                const prod = cloneDeep(data);
                api.product.collections.stripRelations(prod);

                return api[prod.id ? '$put' : '$post']('/product/collection', prod);
            },
        },

        colorSwatch: {
            all(params) {
                return api.$get(`/product/color_swatches/all?${formatParams(params)}`);
            },

            delete(id) {
                return api.$delete('/product/color_swatch', { id });
            },

            get(id) {
                return api.$get('/product/color_swatch', { id });
            },

            list(params) {
                return api.$get(`/product/color_swatches?${formatParams(params)}`);
            },

            upsert(data) {
                return api[data.hasOwnProperty('id') ? '$put' : '$post']('/product/color_swatches', data);
            }
        },

        dataTable: {
            all(params) {
                return api.$get(`/product/data_tables/all?${formatParams(params)}`);
            },

            delete(id) {
                return api.$delete('/product/data_table', { id });
            },

            get(id) {
                return api.$get('/product/data_table', { id });
            },

            list(params) {
                return api.$get(`/product/data_tables?${formatParams(params)}`);
            },

            upsert(data) {
                return api[data.hasOwnProperty('id') ? '$put' : '$post']('/product/data_table', data);
            }
        },

        variant: {
            delete(id) {
                return api.$delete('/product/variant', { id });
            },

            deleteImage(id, media_id) {
                return api.$delete('/product/variant/image', {
                    id,
                    media_id
                });
            },

            get(id, options) {
                return api.$get('/product/variant', {
                    id,
                    ...(isObject(options) ? options : {})
                });
            },

            getSku(id) {
                return api.$get('/product/variant/sku', { id });
            }
        }
    };


    api.nexus = {
        delete(id) {
            return api.$delete('/nexus', { id });
        },

        list(params) {
            return api.$get(`/nexus/list?${formatParams(params)}`);
        },

        get(id) {
            return api.$get('/nexus', { id });
        },

        upsert(data) {
            return api[data.hasOwnProperty('id') ? '$put' : '$post']('/nexus', data);
        }
    };


    api.tenant = {
        contactUs(params) {
            return api.$post('/tenant/contactus', params);
        },

        member: {
            add(data) {
                return api.$post('/tenant/member', data);
            },

            login(data) {
                return api.$post('/tenant/member/login', data);
            },

            logout() {
                return api.$post('/tenant/member/logout');
            }
        }
    };


    api.appConfig = () => {
        return api.$get('/app_config')
    };

    return api;
}