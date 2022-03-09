import axios from 'axios';
import { toast } from 'react-toastify';

const URL = 'http://localhost:8000'

export const addUser = async (data) => {
    try {
        return await axios.post(`${URL}/adduser`, data)
    }
    catch (err) {
        console.log("Error while addUser API", err)
    }
}

export const loginUser = async (data) => {
    try {
        console.log("api----", data);
        const res = await axios.post(`${URL}/loginuser`, data)
        return res;
    }
    catch (err) {
        console.log("Error while loginuser API", err.response)
        toast.error(err)
        return err.response;
    }
}

export const addGenres = async (data) => {
    try {
        return await axios.post(`${URL}/addgenres`, data)
    }
    catch (err) {
        console.log("Error while addGenres API", err)
    }
}

export const getAllGenres = async (param) => {
    try {
        let response = await axios.get(`${URL}/genres${param}`);
        return response.data;
    }
    catch (err) {
        console.log("Error while getAllGenres API", err)
    }
}

export const getGenre = async (id) => {
    try {
        let response = await axios.get(`${URL}/genre/${id}`)
        console.log('id from api', response.data)
        return response.data;
    }
    catch (err) {
        console.log("Error while getGenre API", err)
    }
}

export const updateGenre = async (id, post) => {
    try {
        await axios.post(`${URL}/update/${id}`, post)
    }
    catch (err) {
        console.log("Error while updateGenre API", err)
    }
}

export const deleteGenre = async (id) => {
    try {
        return await axios.delete(`${URL}/delete/${id}`)
    }
    catch (err) {
        console.log("Error while deleteGenre API", err)
    }
}

export const uploadFile = async (data) => {
    try {
        return await axios.post(`${URL}/file/upload`, data)
    }
    catch (err) {
        console.log("Error while uploadFile API", err)
    }
}
