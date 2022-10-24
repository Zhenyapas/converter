import { Input } from '@mui/material';
import * as React from 'react';

const style = {

    height:'50px',fontSize:15,color:'text.secondary'

}

export default function InputLoading(props) {
    return (
        <Input  disabled value={'Loading ...'} variant='standard'
         sx={{...style,...props.sx}} />
    )
}
