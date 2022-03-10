import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import { getAllGenres } from "../Service/api";

import Genre from "./Genre";

const Genres = () => {

    const [genres, setGenres] = useState([])
    const { search } = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            let data = await getAllGenres(search);
            console.log("data", data);
            console.log("search", search);
            setGenres(data.genres)
        }
        fetchData()
    }, [search])

    // let genres = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        genres?.map(genre => (
            <Grid item lg={3} sm={4} xs={12}>
                <Link to={`/details/${genre._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Genre genre={genre} />
                </Link>
            </Grid >
        ))
    )
}

export default Genres;