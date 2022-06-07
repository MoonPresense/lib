import React, { useEffect, useState } from 'react';
import './App.css';
import 'boxicons/css/boxicons.min.css';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Personal from './pages/Personal';
import CardDetails from './pages/CardDetails';
import Reader from './pages/Reader';

import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import Login from './components/Login';



function App() {
    const [userId , setUserId] = useState(0)
    const [idCard, setIdCard] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user !== null) {
                setUserId(Number(user.user.id))
            }
        }
        fetchData();
        
        
    }, [])

    console.log(userId);
    return (
        <>
            <Router>

                <Routes>
                    <Route exact path='/' element={<Home />} />
                    {/* <Route index element={<Home />} /> */}
                    <Route path='/catalog' element={<Catalog setIdCard={setIdCard} idCard={idCard} />} />
                    <Route path='/user' element={<Personal />} />
                    <Route path='/carddetails/:id' element={<CardDetails idCard={idCard} userId={userId}/>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/book/reader/' element={<Reader />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
