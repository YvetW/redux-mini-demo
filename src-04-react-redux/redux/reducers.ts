import {combineReducers} from 'redux';
import {ADD_MESSAGE, DECREMENT, INCREMENT} from './action-types.ts';
import {CountAction, MessageAction} from './actions.ts';

// 管理count
const initCount: number = 0;

function count(state: number = initCount, action: CountAction): number {
    console.log('count', state, action);
    switch (action.type) {
        case INCREMENT:
            return state + action.data;
        case DECREMENT:
            return state - action.data;
        default:
            return state;
    }
}

// 管理messages
const initMessages: string[] = [];

function messages(state: string[] = initMessages, action: MessageAction): string[] {
    console.log('messages', state, action);
    switch (action.type) {
        case ADD_MESSAGE:
            return [action.data, ...state]
        default:
            return state;
    }
}

export default combineReducers({count, messages});

// 整体state状态结构： {count: 2, messages: ['xx', 'xxx']}
