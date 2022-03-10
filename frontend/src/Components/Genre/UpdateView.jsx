import { Box, Button, FormControl, InputBase, makeStyles, TextareaAutosize, Typography } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenre, updateGenre } from "../../Service/api";

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

const UpdateView = () => {
    const classes = useStyle();

    const navigate = useNavigate();

    const [genre, setGenre] = useState(intialValues);
    const [file, setFile] = useState('')
    const [image, setImage] = useState('')

    // const url = genre.picture ? genre.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'

    const { id } = useParams();

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

    useEffect(() => {
        const fetchData = async () => {
            let data = await getGenre(id);
            console.log("data", data);
            setGenre(data.genres)
        }
        fetchData()
    }, [])

    const handleChange = (e) => {
        setGenre({ ...genre, [e.target.name]: e.target.value })
    }

    const updateGenres = async () => {
        await updateGenre(id, genre)
        console.log("id-----------", id);
        navigate(`/details/${id}`)
    }

    return (
        <Box className={classes.container}>
            {/* <img src={url} alt="banner" className={classes.image} /> */}

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
                    placeholder="Title"
                    value={genre.title}
                    className={classes.textfield}
                    onChange={(e) => handleChange(e)}
                    name='title'
                />
                <Button variant="contained" color="primary"
                    onClick={() => updateGenres()}>Update</Button>
            </FormControl>

            <TextareaAutosize
                rowsMin={5}
                placeholder="Write your description..."
                className={classes.textarea}
                value={genre.description}
                onChange={(e) => handleChange(e)}
                name='description'
            />
        </Box>
    )
}

export default UpdateView;