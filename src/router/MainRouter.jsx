import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import PostRouter from './PostRouter'
import HomePage from '../components/HomePage'
import CartPage from '../components/user/CartPage'
import LoginPage from '../components/user/LoginPage'
import JoinPage from '../components/user/JoinPage'

const MainRouter = () => {
    return (
        <Container>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/join' element={<JoinPage/>}/>
                
                <Route path='/post/*' element={<PostRouter/>}/>
            </Routes>
        </Container>
    )
}

export default MainRouter
