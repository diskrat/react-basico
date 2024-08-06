import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";

export default function({post}) {
    const [like, setLike] = useState(<FavoriteBorderIcon/>);
    const handleLike = () => {
        if (like.type.type.render.displayName == "FavoriteBorderIcon"){
            setLike(<FavoriteIcon/>)
            
        } else {
            setLike(<FavoriteBorderIcon/>)
        }
    }
    return (
    <Card raised sx={{margin:'20px'}}>
        <CardHeader
            avatar={
                <Avatar>P</Avatar>
            }
            title='hey'
            action={
                <IconButton onClick={handleLike}>
                    {like}
                </IconButton>
            }
        />

        <CardContent>
            {post.body}
        </CardContent>
    </Card>
)}
