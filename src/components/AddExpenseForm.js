import React, { useState } from 'react';
import axios from 'axios';

function AddExpenseForm({ onExpenseAdded }) {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_URL}/api/expenses`, {
                amount,
                category,
                description,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Expense added');
            onExpenseAdded();
            setAmount('');
            setCategory('');
            setDescription('');
        } catch (error) {
            alert('Failed to add expense');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-indigo-700 text-center">Add New Expense</h2>

            <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-semibold">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-semibold">Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter category"
                    required
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-semibold">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description (optional)"
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>

            <button
                type="submit"
                className="bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
                Add Expense
            </button>
        </form>
    );
}

export default AddExpenseForm;
