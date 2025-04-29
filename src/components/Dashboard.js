import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseList from './ExpenseList';
import AddExpenseForm from './AddExpenseForm';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    const fetchExpenses = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/api/expenses`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setExpenses(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleExpenseAdded = () => {
        fetchExpenses();
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_URL}/api/expenses/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchExpenses();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (expense) => {
        navigate(`/update-expense/${expense._id}`, { state: { expense } });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Expense Dashboard</h1>

                {/* Add Expense Form */}
                <div className="mb-10">
                    <AddExpenseForm onExpenseAdded={handleExpenseAdded} />
                </div>

                {/* Expenses List */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Expenses</h2>
                    <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
