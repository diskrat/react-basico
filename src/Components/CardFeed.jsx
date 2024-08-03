import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";

const CardFeed = () => {
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
            subheader='6min'
            action={
                <IconButton onClick={handleLike}>
                    {like}
                </IconButton>
            }
        />

        <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aliquam euismod felis nibh, a sodales augue faucibus non.
            Donec pulvinar turpis consectetur justo facilisis, eu
            fermentum est scelerisque.
        </CardContent>
    </Card>
)}
export default CardFeed