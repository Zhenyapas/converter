import './App.css';
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {  Box, Button, Container,  Paper, Typography,  } from '@mui/material';
import DateInfo from './components/DateInfo';
import Header from './components/Header';
import Converter from './components/Converter';
import { useDispatch,useSelector } from 'react-redux';
import {axiosConverter} from './Store/converterSlice'



function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  const dispatch = useDispatch();
  const {date,error} = useSelector(state => state.converter);
 
  React.useEffect(() => {
    console.log('render')
    dispatch(axiosConverter());
  },[dispatch]) 

  const update = () => dispatch(axiosConverter());

  const theme = React.useMemo(
    () => 
      createTheme({

        spacing: (factor) => `${0.25 * factor}rem`,
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',

        }
        }),
    [prefersDarkMode],
  );

  
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Container maxWidth={'md'}>
         <Paper sx={{mt:10,maxWidth:650,p:5,height:380,borderRadius:4,pl:0}} >

       
          <DateInfo date={date} sx={{color:'text.secondary', fontSize: 17,ml:5}} />

          {error && <Typography sx={{color:'text.secondary',ml:5}}>Error: {error} </Typography>}

        

         <Header sx={{maxWidth:600,display:'flex',alignItems:'center',justifyContent:'space-between',height: '50px',fontSize:25 , mt:4,ml:5}} />

         <Converter />


        <Box fullwidth sx={{display:'flex',alignItems:'center',justifyContent:'flex-start',mt:8,ml:3}}>
          <Box sx={{display:'flex',flexGrow:1,justifyContent:'flex-start',alignItems:'center'}}>
          <Button variant="standart" sx={{fontSize:16,width:80,}} onClick={update} >update</Button>
          </Box>
        </Box>

         
         </Paper>

        </Container>
    </ThemeProvider>
  );
}

export default App;
