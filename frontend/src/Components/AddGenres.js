import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Loader from '@material-ui/core/CircularProgress';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function AddGenres() {
    const classes = useStyles();
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({
        id: '',
        title: '',
        description: ''
    })

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)

    // useEffect(() => {
    //     if (id) {
    //         setFetching(true);
    //         axios.get(`http://localhost:4000/api/product/getProduct/${id}`).then(({ data: { data } }) => {
    //             const { _id, pdt_name, pdt_price, pdt_brand } = data || {};
    //             setData({
    //                 id: _id,
    //                 pdt_name,
    //                 pdt_price,
    //                 pdt_brand,
    //             });
    //         }).catch((error) => {
    //             alert(error);
    //         }).finally(() => {
    //             setFetching(false);
    //         })
    //     }
    // }, [id]);

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true);
        if (data.id) {
            axios.patch('http://localhost:4000/api/product/updateProduct/' + id, data, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("token")}`
                }
            }).then(({ data: { data } }) => {
                navigate("/list-product");
            }).catch((error) => {
                alert(error)
            }).finally(() => {
                setLoading(false);
            })
        } else {
            axios.post('http://localhost:4000/api/product/addProduct', data, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("token")}`
                }
            }).then(({ data: { data } }) => {
                navigate("/list-product");
            }).catch((error) => {
                alert(error)
            }).finally(() => {
                setLoading(false);
            })
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {fetching ? <Loader /> : <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Genre Title"
                        name="title"
                        onChange={handleChange}
                        value={data.title}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        onChange={handleChange}
                        value={data.description}
                        label="Genre Description"
                        // type="price"
                        id="description"
                    //autoComplete="current-password"
                    />
                    {/* <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="brand"
                        label="Product Brand"
                        name="pdt_brand"
                        onChange={handleChange}
                        value={data.pdt_brand}
                    /> */}
                    { /*<FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />*/}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <Loader size={24} /> : "Submit"}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/*<Link href="#" variant="body2">
                Forgot password?
              </Link>*/}
                        </Grid>
                    </Grid>
                </form>}
            </div>
        </Container>
    );
}
