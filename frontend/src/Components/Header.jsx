import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import React from 'react';

const useStyles = makeStyles({
    component: {
        background: '#FEA08C',
        color: 'black'
    },
    container: {
        justifyContent: 'center',
        '& > *': {
            padding: 20
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
})

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.component}>
            <Toolbar className={classes.container}>
                <Link className={classes.link} to={'/'} >
                    <Typography>Home</Typography>
                </Link>
                <Link className={classes.link} to={'/loginUser'} >
                    <Typography>Login</Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default Header;