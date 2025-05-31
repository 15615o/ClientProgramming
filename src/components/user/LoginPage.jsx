import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { app } from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const auth = getAuth(app); // firebase 인증
    const navi = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            signInWithEmailAndPassword(auth, email, pass)
            .then(success => {
                alert("Login success!");
                sessionStorage.setItem('email', email)
                sessionStorage.setItem('uid', success.user.uid);
                setIsLoading(false);

                if(sessionStorage.getItem('target')){
                    navi(sessionStorage.getItem('target'));
                    sessionStorage.removeItem('target');
                } else {
                    navi('/');
                }

            })
            .catch(error => {
                alert("Login error: " + error.message);
                setIsLoading(false);
            });
        }
    };

    if(isLoading) return <h1 className="my-5 text-center">Loading...</h1>

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