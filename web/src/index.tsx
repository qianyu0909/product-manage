import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  HashRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Login from './page/login';
import Register from './page/register';
import Home from './page/home';
import Layout from './components/layout';
import ClassifyPage from './page/classify';
import ShoppingListPage from './page/shopping-list';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div className='page'>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/classify" element={<Layout><ClassifyPage /></Layout>} />
          <Route path="/shoppinglist" element={<Layout><ShoppingListPage /></Layout>} />
        </Routes>
      </Router>
    </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
