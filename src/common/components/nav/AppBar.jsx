import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Typography  } from '@mui/material';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: `8px`,
    },
    title: {
        flexGrow: 1,
    },
}));

export const MainNav = (page) => {
    const classes = useStyles();
    
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {page.page}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}