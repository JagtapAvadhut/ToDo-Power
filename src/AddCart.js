import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';

const AddCart = () => {
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        priority: 'LOW'
    });

    const navigate = useNavigate();
    const location = useLocation();

    // Check if there's a task to edit
    useEffect(() => {
        const taskToEdit = location.state?.task;
        if (taskToEdit) {
            setNewTask(taskToEdit);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newTask.id) {
                // Update existing task
                await axios.put(`http://localhost:8080/task/cart/${newTask.id}`, newTask);
            } else {
                // Create new task
                await axios.post('http://localhost:8080/task/cart', newTask);
            }
            navigate('/'); // Navigate back to the main page
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '400px',
                margin: 'auto',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
        >
            <TextField
                label="Title"
                name="title"
                value={newTask.title}
                onChange={handleChange}
                required
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Description"
                name="description"
                value={newTask.description}
                onChange={handleChange}
                required
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={newTask.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={newTask.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Priority"
                name="priority"
                select
                value={newTask.priority}
                onChange={handleChange}
                SelectProps={{ native: true }}
                style={{ marginBottom: '16px' }}
            >
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
            </TextField>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <Button variant="outlined" onClick={() => navigate('/')} style={{ flex: 1, marginRight: '8px' }}>
                    Back
                </Button>
                <Button type="submit" variant="contained" style={{ flex: 1 }}>
                    {newTask.id ? 'Update Task' : 'Add Task'}
                </Button>
            </div>
        </form>
    );
};

export default AddCart;
