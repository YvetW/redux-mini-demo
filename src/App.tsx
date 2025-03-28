import {useState} from 'react';
import {increment, decrement, incrementAsync} from './redux/slices/counterSlice.ts';
import {add_message} from './redux/slices/messagesSlice.ts';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from './redux/store.ts';

function App() {
    const [selectedValue, setSelectedValue] = useState<number>(1);
    const [message, setMessage] = useState<string>('');

    // 这里 useSelector 获取状态
    const count = useSelector((state: RootState) => state.counter.value);
    const messages = useSelector((state: RootState) => state.messages.value);

    const dispatch = useDispatch<AppDispatch>(); // 需要类型标注

    function handleIncrement() {
        dispatch(increment(selectedValue));
    }

    function handleDecrement() {
        dispatch(decrement(selectedValue));
    }

    // 奇数增加
    function handleIncrementIfOdd() {
        if (count % 2 === 1) {
            dispatch(increment(selectedValue));
        }
    }

    // 异步增加
    function handleIncrementIfAsync() {
        dispatch(incrementAsync(selectedValue));
    }

    function handleAdd() {
        if (message.trim()) {
            dispatch(add_message(message));
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
