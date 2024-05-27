import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";

const CategoryBar = observer(() => {
    const { product } = useContext(Context)

    return (
        <Row className="d-flex justify-content-around ml-2 ">
            {product.categories.map(category =>
                <Card
                    style={{
                        cursor: 'pointer',
                        minWidth: '200px',
                        textAlign:'center'
                    }}
                    key={category.id}
                    className="p-3"
                    onClick={() => product.setSelectedCategory(category)}
                    bg={category.id === product.selectedCategory.id ? 'danger' : 'light'}
                >
                    {category.name}
                </Card>
            )}
        </Row>
    );
});

export default CategoryBar;
