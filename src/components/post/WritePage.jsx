import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { app } from '../../firebase'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const WritePage = () => {
    const db = getFirestore(app);
    const navi = useNavigate();

    const [form, setForm] = useState({
        email: sessionStorage.getItem('email'),
        date: '',
        title: '',
        content: ''
    });
    const {title, content} = form;

    const onChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    const onSubmit = (e) => {
        e.preventDefault();

        if(title === '' || content === ''){
            alert('Please insert title and content!')
        } else {
            const date = moment(new Date).format('YYYY-MM-DD HH:mm:ss');
            addDoc(collection(db, 'post'), {...form, date});
            navi('/post');
        }
    }
    const onReset = (e) => {
        e.preventDefault();

        setForm({...form,
            title: '',
            content: ''
        });
    }

    return (
        <div>
            <h1 className='text-center my-5'>Write post</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <Form onSubmit={onSubmit} onReset={onReset}>
                        <Form.Control onChange={onChange} value={title} name='title' className='mb-3' placeholder='Title'/>
                        <Form.Control onChange={onChange} value={content} name='content' as='textarea' rows={10} placeholder='Content' />
                        <div className='mt-3 text-center'>
                            <Button type='submit' className='px-5 mx-3'>Save</Button>
                            <Button type='reset' className='px-5' variant='secondary'>Cancel</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default WritePage