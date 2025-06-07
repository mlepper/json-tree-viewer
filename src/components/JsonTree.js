import React from 'react';
import ReactJson from 'react-json-view';

const JsonTree = ({ data, onEdit, fontSize = 14 }) => {
  const handleEdit = (namespace, value) => {
    onEdit(namespace, value);
  };

  if (!data) {
    return (
      <div className="json-tree-container">
        <div className="no-data-message">
          No data to display
        </div>
      </div>
    );
  }

  return (
    <div className="json-tree-container">
      <ReactJson
        src={data}
        name={false}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        theme="monokai"
        onEdit={handleEdit}
        style={{
          backgroundColor: '#272822',
          color: '#f8f8f2',
          borderRadius: '8px',
          padding: '16px',
          fontSize: `${fontSize}px`,
          fontFamily: 'monospace',
          height: '100%',
          overflowY: 'auto'
        }}
      />
    </div>
  );
};

export default JsonTree;
