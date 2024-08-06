import Container from '@mui/material/Container';
import BasicPaper from '../Components/Paper';
import Grid from '@mui/material/Grid';
import { Await, defer, Link, useLoaderData } from 'react-router-dom';
import { getTopico } from '../fetching';


export const topicoLoader = async () => {
  const topicos = await getTopico();
  return defer({ topicos });
};

const HomePage = () => {

  const { topicos } = useLoaderData();

  return (
    <>

      <Await resolve={topicos}>
        <Container maxWidth="md" sx={{ marginY: 5 }}>
          <Grid container spacing={3}>
            {topicos.map((topico) => (
              <BasicPaper topico={topico} key={topico.id} />
            ))}
          </Grid>
        </Container>
      </Await>

    </>
  )
}
export default HomePage