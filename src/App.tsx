import {useState} from 'react';
import {Store} from 'redux';
import {Action, increment, decrement, add_message} from './redux/actions.ts';

// 为 App 组件定义一个 Props 类型，这个类型包含 store
interface AppProps {
    store: Store<{
        count: number;
        messages: string[];
    }, Action>;
}

function App({store}: AppProps) {
    const [selectedValue, setSelectedValue] = useState<number>(1);
    const [message, setMessage] = useState<string>('');

    const count = store.getState().count;
    const messages = store.getState().messages;

    function handleIncrement() {
        store.dispatch(increment(selectedValue));
    }

    function handleDecrement() {
        store.dispatch(decrement(selectedValue));
    }

    // 奇数增加
    function handleIncrementIfOdd() {
        // setCount 是异步的，如果 Redux 状态更新了，count 可能不会立即反映出来，直接从 store.getState() 读取最新的 count
        if (store.getState().count % 2 === 1) {
            store.dispatch(increment(selectedValue));
        }
    }

    // 异步增加
    function handleIncrementIfAsync() {
        setTimeout(() => {
            store.dispatch(increment(selectedValue));
        }, 1000);
    }

    function handleAdd() {
        if (message.trim()) {
            store.dispatch(add_message(message));
            setMessage('');
        }
    }

    return (
        <div className="App">
            <div className="count">
                click <span>{count}</span> times
            </div>
            <select
                id="number" value={selectedValue}
                // <option> 的 value 默认是字符串类型（即使它是一个数字），这里强制转换为数字
                onChange={event => setSelectedValue(Number(event.target.value))}
            >
                {[1, 2, 3, 4, 5].map((item) => (
                    <option value={item} key={item}>{item}</option>
                ))}
            </select>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <button onClick={handleIncrementIfOdd}>increment if odd</button>
            <button onClick={handleIncrementIfAsync}>increment async</button>
            <hr />
            <input
                type="text"
                value={message}
                onChange={event => setMessage(event.target.value)}
            />
            <button onClick={handleAdd}>add text</button>
            <ul>
                {
                    messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))
                }
            </ul>
        </div>
    );
}

export default App;
