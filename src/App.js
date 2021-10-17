import './App.css';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import PostContainer from './components/PostContainer';

function App() {
  return (
    <Container style={{marginTop: "3rem"}} maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <PostContainer></PostContainer>
        </Grid>
      </Grid>
    </Container>

  );
}

export default App;
