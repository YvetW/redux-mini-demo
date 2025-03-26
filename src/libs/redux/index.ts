/*
redux 模块：包含 createStore(reducer) 和 combineReducers(reducers)

1. createStore(reducer)：接收一个reducer函数，返回一个store对象
    使用：createStore(reducers)

2. combineReducers(reducers)：接收一个包含多个reducer函数的对象，返回一个新的reducer函数
    使用：combineReducers({count, messages})

3. store对象
    getState()：得到内部管理的state对象
    dispatch(action)：分发action，会触发reducer调用，返回一个新的state，调用所有绑定的listener
    subscribe(listener)：订阅一个state的监视器
 */

export function createStore(reducer: Reducer<any>) {
    // 内部state
    let state;
    // 内部保存n个listener的数组
    const listeners = [];

    // 第一次调用reducer得到初始状态并保存
    state = reducer(state, {type: '@mini-redux'});

    // 得到内部管理的state对象
    function getState() {
        return state;
    }

    // 分发action，会触发reducer调用，返回一个新的state，调用所有绑定的listener
    function dispatch(action) {
        // 调用reducer，得到一个新的state，保存
        state = reducer({state, action});
        // 调用listeners中所有的监视回调函数
        listeners.forEach(listener => listener())
    }

    // 订阅一个state的监视器，产生新的状态，也就是dispatch时，才执行
    function subscribe(listener) {
        listener.push(listener);
    }

    return {getState, dispatch, subscribe};
}

export function combineReducers(reducer: Reducer<any>) {
}

