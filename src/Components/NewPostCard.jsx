import { Avatar, Box, Button, Card, CardContent, CardHeader } from "@mui/material";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { postTopicoPost } from "../fetching";


export default function NewPostCard() {
    const [user, setUser] = useContext(UserContext)
    const [post, setPost] = useState()
    const location = useParams()
    const topico = location['topicoId']
    const navigate = useNavigate()
    
    const sendPost = (post) =>{
        const data ={
            body: post,
            idTopico:parseInt(topico),
            profile:user
        }
        postTopicoPost(location,data)
        setPost('')
        navigate(`/topicos/${topico}/posts`,{replace: true})
    }

    return (<>
        <Card raised sx={{ margin: '20px' }}>

            <CardContent>
                <Box display='flex'  >
                    <Avatar alt={user} src="/broken-image.jpg" sx={{ margin: 'auto' }}/>
                    <TextField 
                        id="outlined-basic" 
                        label="Menssagem" 
                        variant="outlined" 
                        sx={{
                            flexGrow: 1, 
                            margin: '5px' 
                        }}
                        value={post}
                        onChange={(e)=>{setPost(e.target.value)}}
                        />
                    <Button 
                        onClick={() =>{sendPost(post)}}
                        sx={{ margin: '5px' }} 
                        variant="contained"
                        disabled={!user}
                    >
                        <SendIcon />
                    </Button>
                </Box>
            </CardContent>
        </Card>
    </>)
}