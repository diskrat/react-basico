import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import { UserContext } from '../App';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Link, Outlet, redirect } from 'react-router-dom';

const MainAppBar = () => {
    const [user, setUser] = useContext(UserContext)
    const [open, setOpen] = useState(false);
    const [logged,setLogged] = useState(false)
    const [textValue,setTextValue] = useState('')
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={'/'}>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() =>{redirect('/')}}
                    >
                        <HomeIcon />
                    </IconButton>
                    </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        
                    </Typography>
                    <Button variant="contained" color="secondary" disabled={logged} onClick={handleClickOpen}>{user?user:`Login`}</Button>
                    <Dialog
                        open={open}
                    >
                        <DialogTitle>Diga seu Nome de usuario</DialogTitle>
                        <DialogContent>
                            <TextField
                                variant="filled"
                                required
                                label="nome de usuario"
                                onChange={(e)=>{setTextValue(e.target.value)}}
                            />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={()=>{
                                    setUser(textValue)
                                    handleClose()
                                    setLogged(!logged)
                                }}>Login</Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                </Toolbar>
            </AppBar>
        </Box>
        <Outlet/>
        </>
    )
}
export default MainAppBar