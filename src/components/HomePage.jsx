import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { BsCartPlus } from 'react-icons/bs';
import { app } from '../firebase';
import { getDatabase, ref, set, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const HomePage = () => {
    const db = getDatabase(app);
    const [isLoading, setIsLoading] = useState(false);
    const uid = sessionStorage.getItem('uid');
    const navi = useNavigate();

    const [documents, setDocuments] = useState([]);
    const [query, setQuery] = useState('react');
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(1);

    const callAPI = async () => {
        const url = "https://dapi.kakao.com/v3/search/book?target=title";
        const config = {
            headers: {
                Authorization: "KakaoAK " + process.env.REACT_APP_KAKAO_REST_API_KEY
            },
            params: {
                query: query,
                size: 12,
                page: page
            }
        }
        const res = await axios.get(url, config);
        setDocuments(res.data.documents);
        setLast(Math.ceil(res.data.meta.pageable_count / 12));
    };

    useEffect(() => {
        callAPI();
    }, [page])

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(query === '') {
            alert("검색어를 입력하세요.");
        } else {
            callAPI();
        }
    };

    const onClickCart = (book) => {
        if(uid) {
            get(ref(db, `cart/${uid}/${book.isbn}`))
            .then(snapshot => {
                if(snapshot.exists()) {
                    alert('This book already exists.');
                } else {
                    const date = moment(new Date()).format('YYYY-MM-DD HH:mm-ss');
                    set(ref(db, `cart/${uid}/${book.isbn}`), {...book, date});
                    alert('book has been added!');
                }
            });
        } else {
            navi('/login');
        }
    }

    if(isLoading) return <h1 className='text-center my-5'>Loading...</h1>

    return (
        <div>
            <h1 className='my-5 text-center'>HomePage</h1>
            <Row className='mb-2'>
                <Col>
                    <Form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control 
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Button type='submit'>검색</Button>
                        </InputGroup>
                    </Form>
                </Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row>
                {documents.map(doc =>
                    <Col lg={2} md={3} xs={6} className='mb-2'>
                        <Card>
                            <Card.Body>
                                <img src={doc.thumbnail} width="100%"/>
                            </Card.Body>
                            <Card.Footer>
                                <div className='text-truncate'>{doc.title}</div>
                                <Row>
                                    <Col>{doc.sale_price}원</Col>
                                    <Col className='text-end cart'><BsCartPlus onClick={() => onClickCart(doc)}/></Col>
                                </Row>
                            </Card.Footer>
                        </Card>                        
                    </Col>
                )}
            </Row>
            <div className='text-center mt-3'>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1}>이전</Button>
                <span className='mx-3'>{page}</span>
                <Button onClick={() => setPage(page + 1)} disabled={page === last}>다음</Button>
            </div>
        </div>
    )
}

export default HomePage
