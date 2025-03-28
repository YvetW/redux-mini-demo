import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

// 创建异步 action，模拟延时
export const incrementAsync = createAsyncThunk(
    'counter/incrementAsync', // action type
    async (value: number) => {
        // 模拟异步操作
        return new Promise<number>((resolve) => {
            setTimeout(() => {
                resolve(value);
            }, 1000);
        });
    }
);

const initialState = {value: 0};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        decrement: (state, action: PayloadAction<number>) => {
            state.value -= action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.fulfilled, (state, action) => {
            state.value += action.payload;
        });
    }
});

export const {increment, decrement} = counterSlice.actions;
export default counterSlice.reducer;
