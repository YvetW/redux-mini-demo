/*
redux 模块：包含 createStore(reducer) 和 combineReducers(reducers)

1. createStore(reducer)：接收一个reducer函数，返回一个store对象
    使用：createStore(reducers)

2. combineReducers(reducers)：接收一个包含多个reducer函数的对象，返回一个新的reducer函数
    使用：combineReducers({count, messages})

3. store对象
    getState()：得到内部管理的state对象
    dispatch(action)：分发action，会触发reducer调用，返回一个新的state，调用所有绑定的listener
    subscribe(listener)：监听state的变化，并在状态变化时触发回调。
 */

interface Action {
    type: string;
    data: any;
}

// Reducer 类型
// S 是 state 的类型，A 是 Action 类型，继承自 Action 接口。Action 至少需要有一个 type 字段
type Reducer<S, A extends Action> = (state: S | undefined, action: A) => S

// Store 类型
// S 是泛型，表示 store 中的 state 类型，state 的结构是 不固定的
interface Store<S> {
    getState: () => S;
    dispatch: (action: Action) => void;
    subscribe: (listener: () => void) => () => void; // 订阅返回一个取消订阅的函数
}

export function createStore<S, A extends Action>(rootReducer: Reducer<S, A>): Store<S> {
    // 内部state，第一次调用reducer得到初始状态并保存
    let state: S;
    // 内部保存n个listener的数组
    const listeners: (() => void)[] = [];

    // 初始调用reducer得到初始state值
    state = rootReducer(undefined, {type: '@mini-redux'} as A);

    // 得到内部管理的state对象
    function getState() {
        return state;
    }

    // 分发action，会触发reducer调用，返回一个新的state，调用所有绑定的listener
    function dispatch(action: Action) {
        // 调用reducer，得到一个新的state，保存
        state = rootReducer(state, action as A);
        // 调用listeners中所有的监视回调函数
        listeners.forEach(listener => listener());
    }

    // 订阅state变化，产生新的状态，也就是dispatch时才执行
    function subscribe(listener: () => void) {
        listeners.push(listener); // 将listener加入到订阅列表

        // 返回一个取消订阅的函数（main.ts 通常不需要手动取消，只执行一次，store.subscribe(render) 只执行一次，不会不断创建新的 listener，所以 不会造成内存泄漏。）
        return () => {
            const index = listeners.indexOf(listener);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        };
    }

    // 返回一个store对象
    return {getState, dispatch, subscribe};
}

/*
combineReducers 的最终作用
- 拆分 state
- 独立调用每个 reducer
- 组装新 state 并返回
*/

// 接收一个包含多个reducer函数的对象，返回一个新的reducer函数
export function combineReducers<S, A extends Action>(
    reducers: { [K in keyof S]: Reducer<S[K], A> }
) {
    return function (state: Partial<S> = {} as S, action: A): S { // 这个 rootReducer 函数会传给 createStore()

        // 简版写法
        return Object.keys(reducers).reduce((newState, key) => {
            // 确保类型安全：key 是 S 类型的有效键
            newState[key as keyof S] = reducers[key as keyof S](state[key as keyof S], action)
            return newState
        }, {} as S)

        /*
        // 依次调用所有reducer函数，得到n个新的子状态，封装成对象并返回
        // 准备一个保存所有新状态的容器对象
        const newState = {} as S;
        // 包含所有reducer函数名的数组: ['count', 'messages']
        const keys = Object.keys(reducers) as (keyof S)[];

        keys.forEach(key => {
            // 得到对应的子reducer函数
            const childReducer = reducers[key];
            // 得到对应的子state
            const childState = state[key];
            // 执行子reducer(传统一的action)，保存到新的总state中
            newState[key] = childReducer(childState, action);
        });
        // 返回总的新State
        return newState;
        */
    };
}

