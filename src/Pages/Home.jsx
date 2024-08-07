import Container from '@mui/material/Container';
import BasicPaper from '../Components/Paper';
import Grid from '@mui/material/Grid';
import { Await, defer, Link, useLoaderData} from 'react-router-dom';
import { getTopico } from '../fetching';


export const topicoLoader = async () => {
  const topicos = await getTopico();
  if(!topicos.length){
    throw new Response("",{
      status: 404,
      statusText: "Not Found",
    })
  }
  return defer({ topicos });
};

const HomePage = () => {

  const { topicos } = useLoaderData();
  
  return (
    <>

      <Await resolve={topicos}>
        <Container maxWidth="md" sx={{ marginY: 5 }}>
          <Grid 
          container
          direction="column"
          justifyContent="center"
          spacing={0}
          
           >
          <Grid item xs={6}>
            <Grid container>
            {topicos.map((topico) => (
                <BasicPaper topico={topico} key={topico.id} />
            ))}
            </Grid>
          </Grid>
          </Grid>
        </Container>
      </Await>

    </>
  )
}
export default HomePage