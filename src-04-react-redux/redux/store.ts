import { createStore } from 'redux';
import reducers from './reducers'; // 包含多个reducer的reducer

export const store = createStore(reducers)

// 获取 RootState 类型
export type RootState = ReturnType<typeof store.getState>;
// 获取 AppDispatch 类型
export type AppDispatch = typeof store.dispatch;
