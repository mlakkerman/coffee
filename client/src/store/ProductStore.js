import { makeAutoObservable } from "mobx";
import { deleteProductFromAPI, fetchProducts } from "../http/productAPI";

export default class ProductStore {
    constructor() {
        this._categories = []
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
            console.log('Ошибка при удалении товара: ', error);
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
    resetSelectedEntities() {
        this._selectedOrganization = {};
        this._selectedCategory = {};
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
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
