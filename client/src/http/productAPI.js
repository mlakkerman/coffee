import { $authHost, $host } from "./index";

export const createCategory = async (category) => {
    const { data } = await $authHost.post('api/category', category)
    return data
}

export const fetchCategories = async () => {
    const { data } = await $host.get('api/category',)
    return data
}

export const createProduct = async (product) => {
    const { data } = await $authHost.post('api/product', product)
    return data
}

// корзина

export const addProductInBasket = async (productId, userId) => {
    const { data } = await $authHost.post('api/basket', { productId, userId });
    return data;
};

// В API проверка корзины
export const getBasketForUser = async (userId) => {
    try {
        const { data } = await $authHost.get(`/api/basket/${userId}`);
        return data;
    } catch (e) {
        console.error("Ошибка при получении корзины", e);
        throw new Error('Не удалось загрузить корзину.');
    }
};

export const checkBasket = async (productId, userId) => {
    try {
        const { data } = await $authHost.get(`/api/basket/${userId}/check/${productId}`);
        return data.isInBasket;
    } catch (e) {
        console.error("Ошибка при проверке корзины", e);
        throw new Error('Ошибка при проверке корзины');
    }
};

////////////

export const fetchProducts = async (categoryId, page, limit = 5) => {
    const { data } = await $host.get('api/product', {
        params: {
          categoryId, page, limit //check
        }
    })
    return data
}

export const fetchOneProduct = async (id) => {
    const { data } = await $host.get('api/product/' + id)
    return data
}

export const deleteProductFromAPI = async (id) => {
    const { data } = await $authHost.delete(`api/product/${id}`)
    return data
}
