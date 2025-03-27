import { createStore } from '../libs/redux';
import reducers from './reducers'; // 包含多个reducer的reducer

export default createStore(reducers)
