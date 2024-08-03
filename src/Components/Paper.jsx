
import { Box, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';


import Typography from '@mui/material/Typography';
export default function BasicPaper({ topico }) {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
            <Paper  elevation={2}  sx={{padding:'5px',justifyContent:'center',direction:'column',display:'flex',alignItems:'center',height:100}}>
                <Typography variant='h7' noWrap > {topico.title} </Typography>
            </Paper>
        </Grid>
    )
}