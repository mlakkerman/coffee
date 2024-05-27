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
