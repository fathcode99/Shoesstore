import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Axios from 'axios'
import { useDispatch, useSelector } from "react-redux";

// import pages
import HomePages from './pages/home';
import LoginPages from './pages/login';
import RegisterPages from './pages/register';
import DetailPages from './pages/detail'
import CartPages from './pages/cart'
import HistoryPages from './pages/history'
import HistoryAdmin from './pages/historyAdmin'
import NotFound from "./pages/notFound";

export default function App() {
  const state = useSelector((state) => state.userReducer)

  const dispatch = useDispatch()
  useEffect(() => {
    let id = localStorage.getItem('idUser')
    Axios.get(`http://localhost:2000/user/${id}`)
      .then(res => {
        dispatch({
          type: 'LOGIN',
          payload: res.data
        })
      })
  }, [dispatch])


  if (state.role === "admin") {
    return (
      <div>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/detail/:id" element={<DetailPages />} />
          <Route path="/historyadmin" element={<HistoryAdmin />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    )
  } else if (state.role !== "admin") {
    return (
      <div>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/register" element={<RegisterPages />} />
          <Route path="/detail/:id" element={<DetailPages />} />
          <Route path="/cart" element={<CartPages />} />
          <Route path="/history" element={<HistoryPages />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    )
  }
}
