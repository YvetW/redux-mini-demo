import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice.ts';
import messagesReducer from './slices/messagesSlice.ts';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        messages: messagesReducer
    }
});

export default store;
// 获取 RootState 类型
export type RootState = ReturnType<typeof store.getState>;
// 获取 AppDispatch 类型
export type AppDispatch = typeof store.dispatch;
