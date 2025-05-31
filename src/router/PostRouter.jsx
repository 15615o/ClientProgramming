import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../components/post/ListPage'
import WritePage from '../components/post/WritePage'

const PostRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<ListPage/>} />
            <Route path='/write' element={<WritePage/>} />
        </Routes>
    )
}

export default PostRouter