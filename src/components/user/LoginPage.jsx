import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

const LoginPage = () => {
    const basename = process.env.PUBLIC_URL;
    const [form, setForm] = useState({
        email: 'blue@inha.com',
        pass: '12341234'
    });
    const {email, pass} = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };
    const onSubmit = (e) => {
        e.preventDefault();

        // 유효성 체크
        if(email === '' || pass === ''){
            alert('Please type your Email or Password!');
        } else {
            // 로그인 체크
        }
    };

    return (
        <div>
            <Row className='my-5 justify-content-center'>
                <Col lg={4} md={6} xs={8}>
                    <Card>
                        <Card.Header>
                            <h5>Login</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Control 
                                    placeholder='Email'
                                    className='mb-2'
                                    value={email}
                                    name='email'
                                    onChange={onChange}
                                />
                                <Form.Control
                                    type='password'
                                    placeholder='Password' 
                                    className='mb-2'
                                    value={pass}
                                    name='pass'
                                    onChange={onChange}
                                />
                                <Button
                                    type='submit'
                                    className='w-100'
                                >Login</Button>
                            </Form>
                            <div className='my-2 text-end'>
                                <a href={`${basename}/join`}>Join</a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage