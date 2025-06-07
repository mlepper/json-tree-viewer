import React from 'react';
import FontSizeControl from './FontSizeControl';
import SearchBox from './SearchBox';
import { FiFileText, FiZoomIn, FiSearch } from 'react-icons/fi';
import { useState } from 'react';

const Toolbar = ({ onFileDrop, onFontSizeChange, searchTerm, onSearch }) => {
  const [fileInput, setFileInput] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          onFileDrop(data);
        } catch (error) {
          alert('Error: Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <div className="toolbar-item">
          <button 
            className="file-button"
            onClick={() => fileInput.click()}
          >
            <FiFileText className="toolbar-icon" />
            Load JSON
          </button>
          <input
            type="file"
            accept=".json"
            ref={setFileInput}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
        </div>
        <div className="toolbar-item">
          <SearchBox onSearch={onSearch} searchTerm={searchTerm} />
        </div>
      </div>
      <div className="toolbar-group">
        <div className="toolbar-item">
          <FontSizeControl 
            onIncrease={() => onFontSizeChange(2)}
            onDecrease={() => onFontSizeChange(-2)}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
