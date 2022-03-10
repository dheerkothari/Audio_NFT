

import { Box, Button, FormControl, InputBase, makeStyles, TextareaAutosize, Typography } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { addGenres, uploadFile } from "../../Service/api.js";

const useStyle = makeStyles((theme) => ({
    container: {
        padding: '0 100px',
        [theme.breakpoints.down('md')]: {
            padding: 0
        }
    },
    image: {
        width: '100%',
        height: '50vh',
        objectFit: 'cover'
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
    },
    textfield: {
        flex: 1,
        margin: '0 30px',
        fontSize: 25
    },
    textarea: {
        width: '100%',
        marginTop: 50,
        border: 'none',
        fontSize: 18,
        '&:focus-visible': {
            outline: 'none'
        }
    }
}))

const intialValues = {
    title: "",
    description: ''
}

const CreateView = () => {
    const classes = useStyle();

    const navigate = useNavigate();

    const [genre, setGenre] = useState(intialValues)
    const [file, setFile] = useState('')
    const [image, setImage] = useState('')

    // const url = genre.picture ? genre.picture : 'null'

    // useEffect(() => {
    //     const getImage = async () => {
    //         console.log("file", file);
    //         if (file) {
    //             const data = new FormData();
    //             data.append("name", file.name);
    //             data.append("file", file);

    //             const image = await uploadFile(data);
    //             genre.picture = image.data;
    //             setImage(image.data)
    //         }
    //     }
    //     getImage();
    // }, [file])

    const handleChange = (e) => {
        setGenre({ ...genre, [e.target.name]: e.target.value })
    }

    const saveGenre = async () => {
        await addGenres(genre)
        console.log("22222222222222222", genre);
        navigate('/')
    }

    return (
        <Box className={classes.container}>
            {/* {url != 'null' ? <img src={url} alt="banner" className={classes.image} /> : <p>No Image</p>} */}

            <FormControl className={classes.form}>
                <label htmlFor="fileInput">
                    <AddCircle fontSize="large" color='action' />
                </label>
                {/* <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                /> */}

                <InputBase
                    onChange={(e) => handleChange(e)}
                    placeholder="Title"
                    className={classes.textfield}
                    name='title'
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => saveGenre()}
                >Publish</Button>
            </FormControl>

            <TextareaAutosize
                rowsMin={5}
                placeholder="Write your description..."
                className={classes.textarea}
                onChange={(e) => handleChange(e)}
                name='description'
            />
        </Box>
    )
}

export default CreateView;