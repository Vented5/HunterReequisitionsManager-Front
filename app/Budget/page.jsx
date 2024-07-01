"use client";
import React, { useState, useEffect } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';

const Budget = () => {
  const [currentBudget, setCurrentBudget] = useState('');
  const [previousBudget, setPreviousBudget] = useState('');

  useEffect(() => {
    // Simulate fetching the previous month's budget from an API or database
    const fetchPreviousBudget = () => {
      // Replace with actual API call or logic to get the previous month's budget
      setPreviousBudget('$1000000000000000000');
    };

    fetchPreviousBudget();
  }, []);

  const handleChange = (e) => {
    setCurrentBudget(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save the current month's budget
    console.log('Current month budget submitted:', currentBudget);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Monthly Budget</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Previous Month&aposs Budget</h2>
        <p className="text-lg">{previousBudget}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Current Month&aposs Budget</label>
          <input
            type="text"
            name="currentBudget"
            value={currentBudget}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded"
        >
          <AiOutlineCalendar className="mr-2" />
          Save Budget
        </button>
      </form>
    </div>
  );
};

export default Budget;
