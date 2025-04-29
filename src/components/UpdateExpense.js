import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function UpdateExpense() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [expense, setExpense] = useState(state.expense);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_URL}/api/expenses/${id}`, expense, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Expense Updated Successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to update:', error);
            alert('Error updating expense');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            {/* Back Button */}
            <button
                onClick={() => navigate('/dashboard')}
                className="mb-6 self-start bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition"
            >
                ← Back to Dashboard
            </button>

            {/* Update Form */}
            <form
                onSubmit={handleUpdate}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-blue-600">Update Expense</h2>

                <div>
                    <label className="block text-gray-700 mb-1">Amount</label>
                    <input
                        type="number"
                        value={expense.amount}
                        onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                        placeholder="Enter Amount"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Category</label>
                    <input
                        type="text"
                        value={expense.category}
                        onChange={(e) => setExpense({ ...expense, category: e.target.value })}
                        placeholder="Enter Category"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Description</label>
                    <input
                        type="text"
                        value={expense.description}
                        onChange={(e) => setExpense({ ...expense, description: e.target.value })}
                        placeholder="Enter Description"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
                >
                    Update Expense
                </button>
            </form>
        </div>
    );
}

export default UpdateExpense;
