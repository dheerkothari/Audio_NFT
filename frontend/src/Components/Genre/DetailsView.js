import { Box, makeStyles, Typography } from "@material-ui/core";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Edit, Delete } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
// import Comments from "../Comments/Comments";
import { deleteGenre, getGenre } from "../../Service/api";

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
    icons: {
        float: 'right'
    },
    icon: {
        margin: 5,
        border: '1px solid #878787',
        padding: 5,
        borderRadius: 10,
        color: '#FEA08C'
    },
    heading: {
        fontSize: 35,
        fontWeight: 600,
        textAlign: 'center',
        margin: '50px, 0, 10px, 0'
    },
    subHeading: {
        color: '#878787',
        display: 'flex',
        margin: '20px 0',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}))

const DetailView = () => {
    const classes = useStyle();
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'

    const navigate = useNavigate();

    const [genre, setGenre] = useState({});
    const { id } = useParams();
    console.log("useParams", id);

    useEffect(() => {
        const fetchData = async () => {
            let data = await getGenre(id);
            setGenre(data.genres)
            console.log("data--------------", data);
        }
        fetchData()
    }, [])

    const deleteGenres = async () => {
        await deleteGenre(genre._id)
        navigate(`/`)
    }

    return (
        <Box className={classes.container}>
            {console.log("genre--------------", genre)}
            <img src={genre.picture || url} alt="banner" className={classes.image} />
            <Box className={classes.icons}>
                <Link to={`/update/${genre._id}`}><Edit className={classes.icon} /></Link>
                <Delete onClick={() => deleteGenres()} className={classes.icon} />
            </Box>
            <Typography className={classes.heading}>{genre.title}</Typography>
            {/* <Box className={classes.subHeading}>
                <Link to={`/?username=${genre.username}`} className={classes.link}>
                    <Typography>Author: <span style={{ fontWeight: 600 }}> {genre.username}</span></Typography>
                </Link>
                <Typography style={{ marginLeft: 'auto' }}>{new Date(genre.createdDate).toDateString()}</Typography>
            </Box> */}
            <Typography>{genre.description}</Typography>
            {/* <Comments genre={genre} /> */}
        </Box>
    )
}

export default DetailView;