import { Box, Input } from '@mui/material';
import * as React from 'react';
import InputCurrency from './InputCurrency';
import { useSelector,useDispatch } from 'react-redux';
import { changeAmount,axiosConverter} from '../Store/converterSlice';
import InputLoading from './ui/InputLoading';





 export default function Converter() {


    const {input1,input2,status,error} = useSelector(state => state.converter);

    const isLoading = (status === 'loading' || error);

    console.log(useSelector(state => state.converter.status));

    const dispatch = useDispatch();

    const changeInput = (inputName,inputName2,value) => dispatch(changeAmount({inputName,inputName2,value}))

   
    React.useEffect(() => {
        console.log('render')
        dispatch(axiosConverter());
      },[input1,input2,dispatch]) 

    const onChange = (e) => {

        const secondInput = (e.target.id === 'input1') ? 'input2' : 'input1';
        changeInput(e.target.id,secondInput,e.target.value)
    }


    return (
        <>

        <Box  sx={{maxWidth:600,display:'flex',alignItems:'center',justifyContent:'space-between',height: '50px',fontSize:40,mt:10,mb:6,ml:5}}> 

            <InputCurrency id={'input1'}  default={input1.currency} 
            options={['EUR','USD','UAH']} sx={{mt:3}} />

            {  (isLoading) ? <InputLoading sx={{flexGrow:1,ml:4}}/> 

                :

            <Input  id='input1' value={(+input1.value)} onChange={onChange}  variant='standard' 
            type='Number' sx={{ml:4,flexGrow:1, height:'50px',fontSize:25}} /> 
            }
            

        </Box>


        <Box  sx={{maxWidth:600,display:'flex',alignItems:'center',justifyContent:'space-between',height: '50px',fontSize:40,ml:5}}> 

            {  (isLoading) ?  <InputLoading sx={{flexGrow:1,mr:4}}/>

                :

           <Input  id='input2' onChange={onChange}  value={(+input2.value)} variant='standard'
            type='Number' sx={{mr:4,flexGrow:1, height:'50px',fontSize:25,}}/>
            
            }

            <InputCurrency isHeaderSelect={true}  default={input2.currency}  id='input2' 
              options={['EUR','USD','UAH']} sx={{mt:3,}}  />

        </Box>


        </>
    )
}
