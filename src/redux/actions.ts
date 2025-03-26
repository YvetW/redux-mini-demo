import {INCREMENT, DECREMENT, ADD_MESSAGE} from './action-types.ts';

// 定义 CountAction 的类型
interface CountAction {
    type: typeof INCREMENT | typeof DECREMENT;
    data: number;
}

// 定义 MessageAction 的类型
interface MessageAction {
    type: typeof ADD_MESSAGE;  // 只有 ADD_MESSAGE 类型
    data: string;  // data 是一个字符串
}

// 联合类型
export type Action = CountAction | MessageAction;

export const increment = (number: number): CountAction => ({type: INCREMENT, data: number});

export const decrement = (number: number): CountAction => ({type: DECREMENT, data: number});

export const add_message = (message: string): MessageAction => ({type: ADD_MESSAGE, data: message});
