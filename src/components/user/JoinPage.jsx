import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { app } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const JoinPage = () => {
    const auth = getAuth(app); // firebase 인증
    const navi = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        email: 'green@inha.com',
        pass: '12341234'
    })
    const {email, pass} = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if(email === '' || pass === ''){
            alert('Please type your Email or Password!');
        } else {
            // 회원가입
            if(window.confirm("Do you want to join?")){
                setIsLoading(true);
                createUserWithEmailAndPassword(auth, email, pass)
                .then(success => {
                    setIsLoading(true);
                    alert('Join success!');
                    navi('/');
                })
                .catch(error => {
                    setIsLoading(true);
                    alert('Join error: ' + error.message);
                });
            }
        }
    }

    if(isLoading) return <h1 className="my-5 text-center">Loading...</h1>

    return (
        <div>
            <Row className='my-5 justify-content-center'>
                <Col lg={4} md={6} xs={8}>
                    <Card>
                        <Card.Header>
                            <h5>Join</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Control 
                                    className='mb-2'
                                    value={email}
                                    name='email'
                                    onChange={onChange}
                                />
                                <Form.Control
                                    type='password'
                                    className='mb-2'
                                    value={pass}
                                    name='pass'
                                    onChange={onChange}
                                />
                                <Button type='submit' className='w-100'>Join</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default JoinPage