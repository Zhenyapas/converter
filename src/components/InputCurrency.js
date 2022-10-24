import * as React from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { useDispatch } from 'react-redux';
import { changeCurrency } from '../Store/converterSlice';

const BootstrapInput = styled(InputBase)(({ theme }) => ({

  '& .MuiInputBase-input': {

    fontSize: 20,
    width:'60px',
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:false,

    '&:focus' : {
      backgroundColor:false,
    },
    
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}));

export default function InputCurrency(props) {

  const [value, setValue] = React.useState(props.default);

  

  const dispatch = useDispatch();

  const changeValueCurrency = (inputName,value) => { 

    const inputName2 = (inputName === 'input1') ? 'input2' : 'input1';

    return dispatch(changeCurrency({value,inputName,inputName2}))

  };

  const handleChange = (event) => {
    
    setValue(event.target.value);
    console.log(props.id);

    changeValueCurrency(props.id,event.target.value);
   
  };

  

  return (
    <div>
      <FormControl  sx={props.sx} variant="standard">
        <Select
          value={value}
          onChange={handleChange}
          input={<BootstrapInput error/>}
        >
          {props.options.map((elem,index) => <MenuItem  key={'MenuItem' + index} sx={{p:1,bgcolor:false,display:'flex',justifyContent:'flex-start'}} value={elem}>{elem}</MenuItem>)}

        </Select>
      </FormControl>
    </div>
  );
}
