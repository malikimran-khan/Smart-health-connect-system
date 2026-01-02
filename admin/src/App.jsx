import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainDashBoard from './components/dashboard/MainDashBoard'
import BlogDetail from './components/blogs/BlogDetail'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<MainDashBoard/>}></Route>
          <Route path="/blog-detail/:id" element={<BlogDetail/>} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}
