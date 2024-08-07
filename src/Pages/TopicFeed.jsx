import { Container, Grid } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import CardFeed from "../Components/CardFeed";
import ChatBox from "../Components/Chatbox";
import { Await, defer, useLoaderData, useLocation } from "react-router-dom";
import { getTopicoPost } from "../fetching";
import NewPostCard from "../Components/NewPostCard";



export const postLoader = async ({ params }) => {
    const topicoId = params.topicoId
    const posts = await getTopicoPost(topicoId);
    if(!posts.length){
        throw new Response("",{
          status: 404,
          statusText: "Not Found",
        })
      }
    return defer({ posts })
}


const TopicFeed = () => {
    const { posts } = useLoaderData();
    return (
        <>
            <Await resolve={posts}>
                
                    <Grid container sx={{ marginY: 5 }}>
                        <Grid item xs={7}>
                            <Container maxWidth="xl">

                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    spacing={0}
                                >
                                    <Grid item xs={10}>
                                        <NewPostCard />
                                        {posts.slice().reverse().map((post) => (
                                            <CardFeed post={post} key={post.id} />
                                        ))}
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                        <Grid item xs={5}>
                            <ChatBox />
                        </Grid>
                    </Grid>

            </Await>
        </>)
}
export default TopicFeed
