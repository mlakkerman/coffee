import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, ALLPRODUCTS_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="light" data-bs-theme="light" className="p-3" style={{borderBottom: '1px solid #000'}}>
            <Container className="d-flex justify-content-between">
                <NavLink style={{color:'black', fontSize: 20, textDecoration: 'none'}} to={ALLPRODUCTS_ROUTE}>CoffeeTime</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'black'}}>
                        <Button
                            variant={"danger"}
                            onClick={() => history.push(ADMIN_ROUTE)}
                            className="ml-auto"
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"danger"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'black'}}>
                        <Button variant={"danger"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
