import React, { useState, useEffect } from 'react';
import JsonTree from './components/JsonTree';
import FileDrop from './components/FileDrop';
import FontSizeControl from './components/FontSizeControl';
import SearchBox from './components/SearchBox';
import './App.css';

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [fontSize, setFontSize] = useState(14); // Default font size in pixels
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize searchTerm when component mounts
  useEffect(() => {
    setSearchTerm('');
  }, []);

  // Filter JSON based on search term
  const filteredData = jsonData && searchTerm ? filterJson(jsonData, searchTerm) : jsonData;

  const filterJson = (data, term) => {
    if (!data || typeof data !== 'object') return null;

    if (Array.isArray(data)) {
      return data
        .map(item => filterJson(item, term))
        .filter(item => item !== null);
    }

    const filteredObject = {};
    for (const [key, value] of Object.entries(data)) {
      if (key.toLowerCase().includes(term) || 
          (typeof value === 'string' && value.toLowerCase().includes(term))) {
        filteredObject[key] = value;
      } else if (typeof value === 'object') {
        const filteredValue = filterJson(value, term);
        if (Object.keys(filteredValue).length > 0) {
          filteredObject[key] = filteredValue;
        }
      }
    }
    return Object.keys(filteredObject).length > 0 ? filteredObject : null;
  };

  useEffect(() => {
    fetch('/TestVDM_14_1.0.json')
      .then(response => response.json())
      .then(data => setJsonData(data));
  }, []);

  const handleFileDrop = (data) => {
    setJsonData(data);
  };

  const handleEdit = (namespace, value) => {
    // Update the JSON data based on the edited value
    const newData = JSON.parse(JSON.stringify(jsonData));
    const keys = namespace.split('.');
    let current = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setJsonData(newData);
  };

  const handleFontSizeChange = (delta) => {
    const newFontSize = Math.max(10, Math.min(24, fontSize + delta));
    setFontSize(newFontSize);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>JSON Tree Viewer</h1>
        <FileDrop onFileDrop={handleFileDrop} />
        <SearchBox onSearch={setSearchTerm} searchTerm={searchTerm} />
        <FontSizeControl 
          onIncrease={() => handleFontSizeChange(2)}
          onDecrease={() => handleFontSizeChange(-2)}
        />
      </header>
      <main className="App-main">
        {filteredData && (
          <JsonTree 
            data={filteredData} 
            onEdit={handleEdit} 
            fontSize={fontSize}
          />
        )}
      </main>
    </div>
  );
}

export default App;
