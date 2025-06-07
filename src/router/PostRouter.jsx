import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../components/post/ListPage'
import WritePage from '../components/post/WritePage'
import ReadPage from '../components/post/ReadPage'
import EditPage from '../components/post/EditPage'

const PostRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<ListPage/>} />
            <Route path='/write' element={<WritePage/>} />
            <Route path='/:id' element={<ReadPage/>} />
            <Route path='/edit/:id' element={<EditPage/>} />
        </Routes>
    )
}

export default PostRouter