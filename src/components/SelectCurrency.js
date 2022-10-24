import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectCurrency(props) {
  const [value, setValue] = React.useState(props.default);



  const handleChange = (event) => {
    setValue(event.target.value);
    props.changeValueCurrency(event.target.value);

  };

  return (
    <Box sx={props.sx}>
      <FormControl fullWidth variant='standard'  >
        <Select
          value={value}
          sx={props.sx}
          onChange={handleChange}
        >
          {props.options.map((elem,index) => <MenuItem key={'MenuItem' + index} value={elem}>{elem} / UAH</MenuItem>)}
          
        </Select>
      </FormControl>
    </Box>
  );
}
