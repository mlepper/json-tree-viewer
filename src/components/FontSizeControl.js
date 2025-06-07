import React from 'react';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';

const FontSizeControl = ({ onIncrease, onDecrease }) => {
  return (
    <div className="font-size-controls">
      <button 
        className="font-size-btn"
        onClick={onDecrease}
        title="Decrease font size"
      >
        <FiZoomOut size={20} />
      </button>
      <button 
        className="font-size-btn"
        onClick={onIncrease}
        title="Increase font size"
      >
        <FiZoomIn size={20} />
      </button>
    </div>
  );
};

export default FontSizeControl;
