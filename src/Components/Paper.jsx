
import { LineAxis } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';


import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


export default function BasicPaper({ topico }) {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Link to={`topicos/${topico.id}/posts`}>
                <Paper elevation={2} sx={{ margin: '5px',padding: '30px', justifyContent: 'center', direction: 'column', display: 'flex', alignItems: 'center' }}>
                    <Typography noWrap > {topico.title} </Typography>
                </Paper>
            </Link>
        </Grid>
    )
}