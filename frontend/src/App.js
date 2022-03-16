import React from 'react';
import { Box } from '@material-ui/core'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import Header from './Components/Header';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Dashboard';
import CreateView from './Components/Genre/CreateView';
import DetailView from './Components/Genre/DetailsView';
import UpdateView from './Components/Genre/UpdateView';
// import State from './Components/State';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Box style={{ marginTop: 60 }}>
                <Routes>
                    <Route exact path='/' element={<Dashboard />} />
                    <Route exact path='/addgenres' element={<CreateView />} />
                    <Route exact path='/details/:id' element={<DetailView />} />
                    <Route exact path='/update/:id' element={<UpdateView />} />
                    <Route exact path='/adduser' element={<SignUp />} />
                    <Route exact path='/loginUser' element={<SignIn />} />
                    {/* <Route exact path='/' element={<State />} /> */}
                </Routes>
            </Box>
        </BrowserRouter>
    )
}

export default App;
