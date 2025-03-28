import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {value: [] as string[]};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        add_message: (state, action: PayloadAction<string>) => {
            state.value = [...state.value, action.payload];
        }
    }
});

export const {add_message} = messagesSlice.actions;
export default messagesSlice.reducer;
