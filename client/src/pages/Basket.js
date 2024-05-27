import { useContext, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { CardColumns } from "react-bootstrap";
import ProductItem from '../components/ProductItem';

const Basket = observer(() => {
  const { product } = useContext(Context);

  useEffect(() => {
    product.fetchBasket();
  }, [product]);

  const removeFromBasket = (id) => {
    product.removeFromBasket(id);
  };
  console.log(product.basket)
  return (
    <div>
      <h2>My Basket</h2>
      <CardColumns>
        {product.basket.map((item) =>
          <ProductItem key={item.id} product={item} deleteProduct={removeFromBasket} isBasket/>
        )}
      </CardColumns>
    </div>
  );
});

export default Basket;