import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { changeCurrencyHeader } from '../Store/converterSlice';
import SelectCurrency from './SelectCurrency';





 export default function Header(props) {

    const state = useSelector(state => state.converter);

    const dispatch = useDispatch();

    const loading = (state.status === 'loading' || state.error);

    const changeValueCurrency = (value,) => { 

        return dispatch(changeCurrencyHeader({value}))
    
    };

    return (

    <Box sx={props.sx}>
          
        <SelectCurrency changeValueCurrency={changeValueCurrency} sx={{minWidth:300,fontSize:20}} default={state.inputHeader.currency} options={['USD','EUR']} />
        <Box >
           { (loading) ? <Typography sx={{color:'text.secondary'}}>Loading... </Typography> :
            `${state.inputHeader.value.toFixed(4)}  UAH`}
        </Box>
      
    </Box>
    )
}

