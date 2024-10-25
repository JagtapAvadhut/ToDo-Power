import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';

const TodoCart = () => {
    const [todoData, setTodoData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/task/cart-list');
            setTodoData(response.data);
        } catch (error) {
            console.error('Error fetching todo data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/task/cart/${id}`);
            fetchData(); // Refresh the todo list
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = (task) => {
        navigate('/add', { state: { task } });
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'HIGH': return 'red';
            case 'MEDIUM': return 'orange';
            case 'LOW': return 'green';
            default: return 'black';
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8080/task/search', {
                params: {
                    title: searchTerm,
                    description: searchTerm, // Search in both title and description
                }
            });
            setTodoData(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    const sortedTodoData = [...todoData].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

    return (
        <div>
            <div style={{ display: 'flex', margin: '16px' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginRight: '8px', flex: 1 }}
                />
                <Button onClick={handleSearch} variant="contained">
                    Search
                </Button>
            </div>
            <Button component={Link} to="/add" variant="contained" style={{ margin: '16px' }}>
                Add New Task
            </Button>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {sortedTodoData.map(todo => (
                    <Card key={todo.id} variant="outlined" style={{ maxWidth: 300, margin: '16px', backgroundColor: '#f5f5f5' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                {todo.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">{todo.description}</Typography>
                            <Typography variant="body2" color="text.secondary">Start Date: {todo.startDate} - End Date: {todo.endDate}</Typography>
                            <Typography variant="body2" style={{ fontWeight: 'bold', color: getPriorityColor(todo.priority) }}>
                                Priority: {todo.priority}
                            </Typography>
                        </CardContent>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px 16px' }}>
                            <Button onClick={() => handleEdit(todo)} variant="outlined" style={{ margin: 8 }}>
                                Edit
                            </Button>
                            <Button onClick={() => handleDelete(todo.id)} variant="contained" style={{ margin: 8 }}>
                                Delete
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TodoCart;
