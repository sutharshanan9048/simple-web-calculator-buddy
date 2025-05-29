
import React from 'react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 mb-4">
      <div className="text-right">
        <div className="text-sm text-gray-500 mb-1">log(1) =</div>
        <div className="text-4xl font-light text-gray-900 font-mono">
          {value}
        </div>
      </div>
    </div>
  );
};

export default Display;
