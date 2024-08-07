import { Box, Button, Container, Typography } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>

            <Container>
                <Box
                    sx={{ margin: '5px', padding: '30px', justifyContent: 'center', direction: 'column', display: 'flex', alignItems: 'center' }}>
                    <Typography> Algo deu errado!</Typography>
                    
                </Box>
                <Box sx={{ margin: '5px', padding: '30px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                <Link>
                        <Button 
                            size="large"
                            aria-label="menu"
                            onClick={() => { redirect('/') }}
                        >
                            <HomeIcon/>
                        </Button>
                    </Link>
                </Box>

            </Container>
        </>
    );
}