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
        setImageDisplay(reader.result);
        if (onImagePreview) onImagePreview(reader.result); // Optional callback for image preview
      };
      reader.readAsDataURL(selectedFile);
    }

    // Update initial values with the selected file
    if (setInitialValues) setInitialValues(name, selectedFile);

    if (onFileChange) onFileChange(selectedFile); // Optional callback for file change
  };

  const clearFile = () => {
    setFile(null);
    setImageDisplay(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input value
    }

    // Reset initial values for the file
    if (setInitialValues) setInitialValues('urlimage', null);
  };

  return { imageDisplay, file, handleFileChange, clearFile };
};

export default useFileHandler;
