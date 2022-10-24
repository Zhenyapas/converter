import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  axios from "axios";


const options = (currency) => {

   const obj = { 
        method: 'GET',
        url: 'https://currency-exchange.p.rapidapi.com/exchange',
        params: {from: currency, to: '', q: '1.0'},
        headers: {
            'X-RapidAPI-Key': '3dc1e6f226msh7e4f0add15ff1f7p17e28ajsn792e5675bd5f',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
    }

    return obj
  };



export const axiosConverter = createAsyncThunk (

    'converter/axiosConverter',

    async (_, {rejectWithValue}) => {

        try {
            
            const responseUsd = await axios.request(options('USD'));
            const responseEur = await axios.request(options('EUR'));
            const responseUah = await axios.request(options('UAH'));

            const isStatusOk = (responseUsd.status === 200);
            console.log(isStatusOk);

            if(!isStatusOk) throw new Error('Server Error!');

            const USD = +responseUsd.data.toFixed(4);
            const EUR = +responseEur.data.toFixed(4);
            const UAH = +responseUah.data.toFixed(4);

            return {USD,EUR,UAH}
            
        } catch (error) {

            return rejectWithValue(error.message);
            
        }
    }
)

const converterSlice = createSlice ({

    name: 'converter',
    

    initialState : {

        status: null,

        date: new Date(),

        error: null,

        inputHeader: {
            currency:'USD',
            value: 0
        },



        input1: {

            currency:'USD',
            value: 0, 
        },
        input2: {

            currency:'EUR',
            value: 0
        },

        ratioCurrency: {

            USD: null,
            EUR: null,
            UAH: null,

        }

    },
    reducers: {

        changeCurrencyHeader(state, action) {

            state.inputHeader.currency = action.payload.value;

            const ratio = +state.ratioCurrency[action.payload.value] / +state.ratioCurrency['UAH'];

            state.inputHeader.value = ratio;
            
        },
        

        changeCurrency(state, action) {

            const currentInput = action.payload.inputName;
            const anotherInput = action.payload.inputName2
            const newValueCurrency = action.payload.value;

            state[currentInput].currency = newValueCurrency;

            const currency1 = state.ratioCurrency[state[currentInput].currency];
            const currency2 = state.ratioCurrency[state[anotherInput].currency];

            
            const ratio = +currency1 / +currency2;

            state[anotherInput].value = state[currentInput].value * ratio;

        },

        changeAmount(state,action) {

            let currency1 = state.ratioCurrency[state[action.payload.inputName].currency];
            let currency2 = state.ratioCurrency[state[action.payload.inputName2].currency];

            const ratio = +currency1 / +currency2;

            state[action.payload.inputName].value = action.payload.value ;
            state[action.payload.inputName2].value = +(action.payload.value)  * ratio;


        }

    },
    extraReducers: {

       [axiosConverter.pending] : (state, action) => {
           state.status = 'loading';
           state.error = null;
       },
       [axiosConverter.fulfilled] : (state, action) => {
           state.status = 'loaded'
           console.log(action.payload)
           state.ratioCurrency = action.payload;
           state.inputHeader.value = state.ratioCurrency[state.inputHeader.currency]/state.ratioCurrency.UAH;
           state.date = new Date();
       },
       [axiosConverter.rejected] : (state, action) => {
           state.status = 'rejected';
           state.error = action.payload;
       },

    }
});

export const {changeCurrency,changeCurrencyHeader, changeAmount} = converterSlice.actions;
export default converterSlice.reducer;