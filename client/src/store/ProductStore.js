import { makeAutoObservable } from "mobx";
import { deleteProductFromAPI } from "../http/productAPI";
import { fetchProducts } from "../http/productAPI";
import { addProductToBasketAPI, fetchBasketAPI, removeProductFromBasketAPI } from "../http/basketAPI";
export default class ProductStore {
    constructor() {
        this._userId = localStorage.getItem('userId');
        this._categories = []
        this._basket = []
        this._products = []
        this._selectedCategory = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }
    setProducts(products) {
        this._products = products
    }
    deleteProduct = async (id) => {
        try {
            await deleteProductFromAPI(id);
            this._products = this._products.filter(product => product.id !== id);
            this._totalCount--;
            if (this._products.length === 0 && this.page !== 1) {
                this.setPage(this.page - 1);
                await fetchProducts();
            }

        } catch (error) {
            console.log('Ошибка при удалении мероприятия: ', error);
        }
    };

    setSelectedCategory(category) {
        this.setPage(1)
        if (this._selectedCategory === category) {
            this._selectedCategory = {}
        } else {
            this._selectedCategory = category
        }
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    async fetchBasket() {
        try {
            const data = await fetchBasketAPI(this._userId);
            this._basket = data.data;
        } catch (error) {
            console.log('Fetch basket error:', error);
        }
    }

    async addToBasket(productId) {
        try {
            await addProductToBasketAPI(productId, this._userId);
            this.fetchBasket();
        } catch (error) {
            console.log('Add to basket error:', error);
        }
    }
    
    async removeFromBasket(productId) {
        try {
            await removeProductFromBasketAPI(productId, this._userId);
            this.fetchBasket();
        } catch (error) {
            console.log('Remove from basket error:', error);
        }
    }     

    get basket() {
        return this._basket;
    }
    get categories() {
        return this._categories
    }
    get events() {
        return this._products
    }
    get selectedCategory() {
        return this._selectedCategory
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
