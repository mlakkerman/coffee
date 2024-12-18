import { useContext, useState, useEffect } from 'react';
import { Context } from "../index";
import { CardColumns } from "react-bootstrap";
import { getBasketForUser } from '../http/productAPI';
import { Button, Container, Row, Col } from "react-bootstrap";
import ProductItem from '../components/ProductItem';

const Basket = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    if (user.user.id) {
      getBasketForUser(user.user.id)
        .then((data) => {
          setProducts(data); // Если данные получены, сохраняем их в состояние
        })
        .catch((error) => {
          console.error('Ошибка при получении корзины:', error);
          alert('Не удалось загрузить корзину. Попробуйте позже.');
        });
    }
  }, [user.user.id]);

  return (
    <div>
      <Row className="justify-content-md-center mt-4 pd-2">
        <h2 >Ваша корзина:</h2>
      </Row>

      {products.length > 0 ? (
        <CardColumns>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </CardColumns>
      ) : (
        <p>Ваша корзина пуста!</p> // Если корзина пустая
      )}
    </div>
  );
};

export default Basket;
