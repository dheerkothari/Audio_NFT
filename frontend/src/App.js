import React from 'react';
import { Box } from '@material-ui/core'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import Header from './Components/Header';
// import Home from './components/Home/Home';
// import DetailView from './components/post/DetailView';
// import CreateView from './components/post/CreateView';
// import UpdateView from './components/post/UpdateView';
import SignUp from './Components/SighUp';
import SignIn from './Components/SighIn';
import Dashboard from './Components/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Box style={{ marginTop: 60 }}>
                <Routes>
                    <Route exact path='/' element={<Dashboard />} />
                    {/* <Route exact path='/details/:id' element={<DetailView />} />
                    <Route exact path='/create' element={<CreateView />} />
          <Route exact path='/update/:id' element={<UpdateView />} />
          <Route exact path='/delete/:id' element={<UpdateView />} /> */}
                    <Route exact path='/adduser' element={<SignUp />} />
                    <Route exact path='/loginUser' element={<SignIn />} />
                </Routes>
            </Box>
        </BrowserRouter >
    )
}

export default App;
