import './App.css';
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </div>
    </Provider>
  );
}

export default App;
