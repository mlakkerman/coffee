import React, { useContext } from 'react';
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom"
import { PRODUCT_ROUTE } from "../utils/consts";
import { IoTrashOutline } from "react-icons/io5";

const ProductItem = ({ product, deleteProduct }) => {
    const history = useHistory()
    const deleteCardProduct = async (e) => {
        e.stopPropagation();
        try {
            await deleteProduct(product.id);
        } catch (error) {
            console.log('Ошибка при удалении мероприятия: ', error);
        }
    };
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}>
            <Card style={{ width: 230, cursor: 'pointer' }} border={"light"}>
                <Image width={230} height={230} src={process.env.REACT_APP_API_URL + product.img} />
                <div className="text-black mt-1 d-flex justify-content-between align-items-center">
                    <div>{product.title}</div>
                    <IoTrashOutline size={22} onClick={deleteCardProduct} />
                </div>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    {product.description}
                </div>
            </Card>
        </Col>
    );
};

export default ProductItem;
