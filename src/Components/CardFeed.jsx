import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";



export default function ({ post }) {


    return (
         <>{ post.body &&
            <Card raised sx={{ margin: '20px' }}>
                <CardHeader
                    avatar={<Avatar

                        alt={post.profile}
                        src="/broken-image.jpg"
                    ></Avatar>}
                    title={post.profile}
                />

                <CardContent>{post.body}</CardContent>
            </Card>
}
            </>
    )
}
