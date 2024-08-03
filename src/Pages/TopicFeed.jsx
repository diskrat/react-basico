import { Avatar, Card, CardContent, CardHeader, Container, IconButton, Typography } from "@mui/material";

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