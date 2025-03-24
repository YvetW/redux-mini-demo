import {useState} from 'react';

function App() {
    const [count, setCount] = useState(0);
    const [selectedValue, setSelectedValue] = useState(1);
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    function handleSelectedValue(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedValue(Number(event.target.value));
    }

    function increment() {
        setCount(count + selectedValue);
    }

    function decrement() {
        setCount(count - selectedValue);
    }

    // 奇数增加
    function incrementIfOdd() {
        if (selectedValue % 2 === 1) {
            setCount(count + selectedValue);
        }
    }

    // 异步增加
    function incrementIfAsync() {
        setTimeout(() => {
            setCount(count + selectedValue);
        }, 1000);
    }

    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
    }

    function handleAdd() {
        setMessages([message, ...messages]);
        setMessage('');
    }

    return (
        <div className="App">
            <div className="count">
                click <span>{count}</span> times
            </div>
            <select id="number" value={selectedValue} onChange={handleSelectedValue}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={incrementIfOdd}>increment if odd</button>
            <button onClick={incrementIfAsync}>increment async</button>
            <hr />
            <input type="text" value={message} onChange={handleInput} />
            <button onClick={handleAdd}>add text</button>
            <ul>
                {
                    messages.map((message) => (
                        <li>{message}</li>
                    ))
                }
            </ul>
        </div>
    );
}

export default App;
