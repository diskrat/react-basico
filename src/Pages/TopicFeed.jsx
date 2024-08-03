import { Avatar, Card, CardContent, CardHeader, Container, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import CardFeed from "../Components/CardFeed";

const TopicFeed = () => {
    
        
    return (<>
        <Container maxWidth="sm" sx={{ marginY: 5 }}>
            <CardFeed/>
            <CardFeed/>
            <CardFeed/>
            <CardFeed/>
            <CardFeed/>
        </Container>
    </>)
}
export default TopicFeed