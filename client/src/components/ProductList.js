import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ProductItem from "./ProductItem";

const ProductList = observer(() => {
    const {product} = useContext(Context)
    const productsFromContext = product?.products;
    const handleDeleteProduct = async (id) => {
        product.deleteProduct(id);
    }
    const finalProducts = product || productsFromContext;
   
    if (!finalProducts) {
        return null;
    }
    return (
        <Row className="d-flex justify-content-center">
            {product.events.map(product =>
                <ProductItem key={product.id} product={product} deleteProduct={handleDeleteProduct}/>
            )}
        </Row>
    );
});

export default ProductList;
