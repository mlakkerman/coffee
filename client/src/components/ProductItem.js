import React, { useContext, useState, useEffect } from 'react';
import { Card, Col } from "react-bootstrap";
import { Context } from "../index";
import { useParams } from 'react-router-dom';
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";
import { IoTrashOutline } from "react-icons/io5";
import { BiCart } from "react-icons/bi";
import { addProductInBasket, checkBasket } from "../http/productAPI";

const ProductItem = ({ product, deleteProduct }) => {
    const { user } = useContext(Context);
    const history = useHistory();
    const { id } = useParams();

    const [isProductInBasket, setIsProductInBasket] = useState(false);

    // Проверяем, есть ли товар в корзине при первом рендере
    useEffect(() => {
        if (user.user.id) {
            checkBasket(product.id, user.user.id).then(isInBasket => {
                setIsProductInBasket(isInBasket);
            }).catch((e) => {
                console.error("Ошибка при проверке корзины", e);
                alert("Произошла ошибка при проверке корзины.");
            });
        }
    }, [user.user.id, product.id]);

    const handleButtonClick = async (e) => {
        e.stopPropagation();
        if (isProductInBasket) {
            alert("Этот товар уже добавлен в корзину!");
        } else {
            try {
                await addProductInBasket(product.id, user.user.id);
                setIsProductInBasket(true); // Обновляем состояние корзины
                alert("Вы успешно добавили товар в корзину!");
            } catch (error) {
                console.error("Ошибка при добавлении товара в корзину", error);
                alert("Произошла ошибка, попробуйте позже.");
            }
        }
    };

    const deleteCardProduct = async (e) => {
        e.stopPropagation();
        try {
            await deleteProduct(product.id);
        } catch (error) {
            console.log('Ошибка при удалении товара: ', error);
            alert("Не удалось удалить товар.");
        }
    };

    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}>
            <Card style={{ width: 230, cursor: 'pointer' }} border={"light"}>
                <Image width={230} height={230} src={process.env.REACT_APP_API_URL + product.img} />
                <div className="text-black mt-1 d-flex justify-content-between align-items-center">
                    <div>{product.title}</div>
                    {user.user.role === 'USER' && !isProductInBasket && (
                        <BiCart size={22} onClick={handleButtonClick} style={{ cursor: 'pointer' }} />
                    )}
                    {user.user.role === 'USER' && isProductInBasket && (
                        <span style={{ color: 'green' }}>Товар в корзине</span>
                    )}
                    {user.user.role === 'ADMIN' && (
                        <IoTrashOutline size={22} onClick={deleteCardProduct} style={{ cursor: 'pointer' }} />
                    )}
                </div>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    {product.description}
                </div>
            </Card>
        </Col>
    );
};

export default ProductItem;
