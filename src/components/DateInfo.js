import { Box } from '@mui/material';
import * as React from 'react';




 export default function DateInfo(props) {


  const [dateUpdated,setUpdate] = React.useState(new Date());

  React.useEffect(() => setUpdate(props.date),[props.date]);

   const date = dateUpdated;
   const day = date.getDate();
   const monthParse = (month) => ['Dec','Jan','Feb','March','May','June','July','Aug','Sep','Oct','Nov'][month];
   const month = monthParse(date.getMonth())
   const year = date.getFullYear();
   const time =(date.getMinutes() > 9) ? date.getHours() + ":" + date.getMinutes() :
   `${date.getHours()}:0${date.getMinutes()}` ;

   

  console.log(month);
    return (
        <Box sx={props.sx}>Today, {day} {month} {year} {time}</Box>
    )
}

