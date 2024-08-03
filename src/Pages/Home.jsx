import Container from '@mui/material/Container';

import { useState, useEffect } from 'react';
import BasicPaper from '../Components/Paper';
import Grid from '@mui/material/Grid';


const HomePage = () => {

  const [topicos, setTopicos] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/topicos')
      .then(response => response.json())
      .then(data => setTopicos(data))
      .then(console.log(topicos))
  }, [])

  return ( topicos &&
    <>

      <Container maxWidth="lg" sx={{ marginY: 5 }}>
        <Grid container spacing={1}>
          {topicos.map((topico) => (
            <BasicPaper topico={topico} key={topico.id} />
          ))}
        </Grid>
      </Container>
    </>
  )
}
export default HomePage