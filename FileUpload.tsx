import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  acceptedFileTypes?: string[];
  maxSize?: number;
  isPremium?: boolean;
}

export default function FileUpload({
  onFileUpload,
  acceptedFileTypes = ['.csv', '.png', '.jpg', '.jpeg'],
  maxSize = 10485760, // 10MB
  isPremium = false
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setError(null);
      onFileUpload(selectedFile);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxSize,
    disabled: !isPremium || uploading,
  });

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    
    try {
      // In a real implementation, this would upload to your backend
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success handling would go here
    } catch (err) {
      setError('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50 bg-opacity-5' 
            : 'border-gray-600 hover:border-gray-500'
        } ${!isPremium ? 'opacity-75' : ''}`}
      >
        <input {...getInputProps()} />
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        
        <div className="mt-4 flex text-sm text-gray-400 justify-center">
          <label className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
            <span className="px-4 py-2">Upload a file</span>
          </label>
          <p className="pl-1 pt-2">or drag and drop</p>
        </div>
        
        <p className="text-xs text-gray-400 mt-2">
          CSV, PNG, JPG up to 10MB
        </p>
        
        {file && (
          <div className="mt-4 text-sm text-gray-300">
            Selected: <span className="font-medium">{file.name}</span> ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-red-500">
          {error}
        </div>
      )}
      
      {file && (
        <div className="mt-4">
          <button
            onClick={handleUpload}
            disabled={uploading || !isPremium}
            className={`w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              uploading || !isPremium ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? 'Uploading...' : 'Analyze File'}
          </button>
        </div>
      )}
    </div>
  );
}
