"use client"
import React, { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

const RequestProgress = () => {
  const stages = [
    'Make Request',
    'Validate Request',
    'Advise on Request',
    'Purchase',
    'Ordered',
    'Received',
    'Delivered and In Stock'
  ];

  const [currentStage, setCurrentStage] = useState(0);

  const advanceStage = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const resetStages = () => {
    setCurrentStage(0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Request Progress</h1>
      <div className="flex flex-col items-center space-y-6">
        {stages.map((stage, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-full ${index <= currentStage ? 'bg-green-500' : 'bg-gray-300'}`}>
              {index <= currentStage && <AiFillCheckCircle className="text-white m-auto" />}
            </div>
            <span className="text-lg">{stage}</span>
          </div>
        ))}
      </div>
      <div className="flex space-x-4 mt-8">
        <button
          onClick={advanceStage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Advance Stage
        </button>
        <button
          onClick={resetStages}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default RequestProgress;
