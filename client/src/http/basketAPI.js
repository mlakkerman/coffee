import {$authHost} from './index';

export const addProductToBasketAPI = async (productId, userId) => {
    const {data} = await $authHost.post('api/basket', { productId, userId });
    return data;
}

export const fetchBasketAPI = async (userId) => {
    const {data} = await $authHost.get(`api/basket/${userId}`);
    return data;
}

export const removeProductFromBasketAPI = async (productId, userId) => {
    const {data} = await $authHost.delete('api/basket', { data: { productId, userId } });
    return data;
}
