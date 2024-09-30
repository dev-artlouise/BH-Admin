import { useState } from 'react';

const useFileHandler = (fileInputRef, initialImage = null, setInitialValues, name) => {
  const [imageDisplay, setImageDisplay] = useState(initialImage);
  const [file, setFile] = useState(null);

  const handleFileChange = (event, onFileChange, onImagePreview) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update initial values with the selected file
        if (setInitialValues) {
          setInitialValues(`${name}_preview`, reader.result);
          setInitialValues(name, selectedFile);
        }
        setImageDisplay(reader.result);
        if (onImagePreview) onImagePreview(reader.result); // Optional callback for image preview
      };

      reader.readAsDataURL(selectedFile);
      if (fileInputRef.current) {
        fileInputRef.current.value = selectedFile; // Clear the file input value
      }
    }

    if (onFileChange) onFileChange(selectedFile); // Optional callback for file change
  };

  const clearFile = () => {
    setFile(null);
    setImageDisplay(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input value
    }

    // Reset initial values for the file
    if (setInitialValues) setInitialValues(name, null);
  };

  return { imageDisplay, file, handleFileChange, clearFile };
};

export default useFileHandler;
