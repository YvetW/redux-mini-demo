import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.scss';
import App from './App';
import store from './redux/store.ts';

const root = createRoot(document.getElementById('root')!); // 只调用一次 createRoot()

// root.render() 负责后续更新
function render() {
    root.render(
        <StrictMode>
            <App store={store} />
        </StrictMode>,
    );
}

// 初次渲染
render();

// 订阅 store，state 变化时触发 render
store.subscribe(render);


