import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import '../src/styles/index.scss';

ReactDOM.render(
    <Router>
        <App />
    </Router>, document.getElementById('root'));
