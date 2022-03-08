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
        await axios.post(`${URL}/loginuser`, data).then((result) => {
            console.log("--------------", result);
            return data;
        })

    }
    catch (err) {
        console.log("Error while loginuser API", err)
        toast.error(err)
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
