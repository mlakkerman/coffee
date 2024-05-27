import React, { useState } from 'react';
import { Button, Container, Row, Col } from "react-bootstrap";
import CreateCategory from "../components/modals/CreateCategory";
import CreateProduct from "../components/modals/CreateProduct";

const Admin = () => {
    const [categoryVisible, setCategoryVisible] = useState(false)
    const [eventVisible, setEventVisible] = useState(false)

    return (
        <Container>
            <Row className="justify-content-md-center mt-4">
                <h3>Админ панель</h3>
            </Row>
            <Row className="d-flex align-items-stretch justify-content-md-center">
                <Col xs={12} md={6} lg={4} className="text-center d-flex align-items-stretch p-2">
                    <Button
                        variant={"outline-dark"}
                        className="mt-4 w-100"
                        onClick={() => setCategoryVisible(true)}
                    >
                        Добавить категорию напитка
                    </Button>
                </Col>
                <Col xs={12} md={6} lg={4} className="text-center d-flex align-items-stretch p-2">
                    <Button
                        variant={"outline-dark"}
                        className="mt-4 w-100"
                        onClick={() => setEventVisible(true)}
                    >
                        Добавить напиток
                    </Button>
                </Col>
            </Row>
            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            <CreateProduct show={eventVisible} onHide={() => setEventVisible(false)}/>
        </Container>
    );
};

export default Admin;