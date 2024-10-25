import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoCart from './TodoCart';
import AddCart from './AddCart';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TodoCart />} />
                <Route path="/add" element={<AddCart />} />
            </Routes>
        </Router>
    );
};

export default App;
