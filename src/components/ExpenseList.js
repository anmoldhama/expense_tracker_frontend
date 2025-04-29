import React from 'react';

function ExpenseList({ expenses, onEdit, onDelete }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Expenses</h2>

            {expenses.length === 0 ? (
                <p className="text-gray-500 text-center">No expenses found. Start adding some!</p>
            ) : (
                <ul className="flex flex-col gap-4">
                    {expenses.map((expense) => (
                        <li
                            key={expense._id}
                            className="flex justify-between items-center bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition"
                        >
                            <div>
                                <p className="text-lg font-semibold text-indigo-600">
                                    ₹{expense.amount} - {expense.category}
                                </p>
                                <p className="text-gray-600 text-sm">{expense.description || 'No description'}</p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => onEdit(expense)}
                                    className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(expense._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ExpenseList;
