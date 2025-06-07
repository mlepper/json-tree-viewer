import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileDrop = ({ onFileDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/json': ['.json'],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target.result);
          onFileDrop(content);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    },
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the JSON file here...</p>
      ) : (
        <p>Drag and drop a JSON file here, or click to select files</p>
      )}
    </div>
  );
};

export default FileDrop;
