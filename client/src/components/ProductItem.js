import React, { useContext } from 'react';
import { Card, Col } from "react-bootstrap";
import { Context } from "../index";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom"
import { PRODUCT_ROUTE } from "../utils/consts";
import { IoTrashOutline } from "react-icons/io5";
import { BiCart } from "react-icons/bi";

const ProductItem = ({ product: item, deleteProduct }) => {
    const { product } = useContext(Context);
    const history = useHistory();

    const addToBasket = (e) => {
        e.stopPropagation();
        product.addToBasket(item.id);
    };

    const deleteCardProduct = async (e) => {
        e.stopPropagation();
        try {
            await deleteProduct(item.id);
        } catch (error) {
            console.log('Ошибка при удалении мероприятия: ', error);
        }
    };

    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(PRODUCT_ROUTE + '/' + item.id)}>
            <Card style={{ width: 230, cursor: 'pointer' }} border={"light"}>
                <Image width={230} height={230} src={process.env.REACT_APP_API_URL + item.img} />
                <div className="text-black mt-1 d-flex justify-content-between align-items-center">
                    <div>{item.title}</div>
                    <BiCart size={22} onClick={addToBasket} />
                    <IoTrashOutline size={22} onClick={deleteCardProduct} />
                </div>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    {item.description}
                </div>
            </Card>
        </Col>
    );
};

export default ProductItem;

