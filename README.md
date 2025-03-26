# Redux Mini (vite + react + redux + ts)

一个简易版 redux 实现，帮助理解 redux 的核心原理。
- react v19
- redux v5

## 项目介绍

本项目是一个 redux 迷你实现，旨在帮助学习 redux 的状态管理机制，包括 `store`、`action`、`reducer`、`dispatch` 等核心概念。

---

## src-01-basic

使用 react 函数组件和 ts，不使用redux实现基本功能

---

## src-02-redux 
### **基础版 Redux 实现**
**不使用 `react-redux`**，而是直接使用 Redux `createStore` API（已过时，但用于学习）。

**步骤**

1. **创建 Action Types (`action-types.ts`)**  
   - 在 Redux 中，所有的 action 都应有一个唯一的 type，定义 `type` 常量。
   - 定义 `type` 常量，例如：`INCREMENT`、`DECREMENT`、`ADD_MESSAGE`，用于标识 `action` 的类型。

2. **创建 Reducer (`reducers.ts`)**
    - Redux 需要 reducers 来处理 state 变化，这里创建两个 reducer：count 和 messages。
    - 根据不同 `action` 类型更新 `state`，返回新的 `state`。

3. **创建 Actions (`actions.ts`)**
    - Actions 是 Redux store 唯一的数据来源。

4. **创建 Store (`store.ts`)**
    - 通过 `createStore(rootReducer)` （已过时，但仍可用于学习）创建 Redux `store`，集中管理应用状态。

5. **在 `App.tsx` 中使用 `store`**
    - 通过 `props.store.getState()` 获取 `state`，控制组件渲染。
    - 通过 `props.store.dispatch(action)` 触发状态更新。

6. **在 `main.tsx` 中订阅 Store 并触发渲染**
    - `createRoot()` 挂载 `App` 组件。
    - 通过 `store.subscribe()` 监听 `state` 变化，每次 `dispatch` 触发 `state` 变更时重新渲染 `App`。
    - React 18 及以上使用 createRoot() 进行渲染，注意避免重复 createRoot() 调用。
   
---

## src-0?-redux-toolkit
实现 redux
使用 `Redux Toolkit`
