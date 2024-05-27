import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryBar from "../components/CategoryBar";
import DeviceList from "../components/ProductList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchCategories, fetchProducts} from "../http/productAPI";
import Pages from "../components/Pages";

const AllProducts = observer(() => {
    const { product } = useContext(Context)

    useEffect(() => {
        fetchCategories().then(data => product.setCategories(data))
        fetchProducts(null, 1, 8).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchProducts(product.selectedCategory.id, product.page, 8).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product.page, product.selectedCategory, product.totalCount])

    return (
        <Container>
            <Row className="mr-auto d-flex align-items-center mt-1 pt-3">
                <h4>Мы предлагаем:</h4>
                
            </Row>
            <Row className="mr-auto d-flex align-items-center pt-3">
            <h6>Свежую выпечку, ароматные кофе и вкусные чаи</h6> 
            </Row>
            
            <Row className="mt-4">
                <Col>
                    <Row className="d-flex justify-content-center mt-2 mb-2"><h5>Меню кофейни CoffeeTime:</h5></Row>
                    <CategoryBar />
                    <DeviceList />
                    <Row className="d-flex align-items-end justify-content-center mb-4">
                        <Pages />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
});

export default AllProducts;
