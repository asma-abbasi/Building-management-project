import { Alert, Snackbar } from '@mui/material';
//import { makeStyles } from '@mui/styles';
import React from 'react'

// const useStyles = makeStyles(theme => ({
//     root: {
//         top: theme.spacing(9)
//     }
// }))

export default function Notification(props) {

    const { notify, setNotify, message } = props;
    //const classes = useStyles()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            // className={classes.root}
            style={{ top: '7%' }}
            open={notify.isOpen}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}>
            <Alert
                severity={notify.type}
                onClose={handleClose}>
                {notify.message ? notify.message : message}
            </Alert>
        </Snackbar>
    )
}