
import { Box, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
export default function BasicPaper({topico}) {
    return (
        <Grid item xs={2} >
            <Paper elevation={2}>
                <Box padding={1} textAlign={'center'} >
                    <Typography variant='h8' > {topico.title} </Typography>
                </Box>
            </Paper>
        </Grid>
    )
}