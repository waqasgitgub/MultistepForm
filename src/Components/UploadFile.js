// import React, { useState, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';

// const FileUpload = () => {
//   const [files, setFiles] = useState([]);
//   const [uploadProgress, setUploadProgress] = useState({});
//   const [uploadComplete, setUploadComplete] = useState({});

//   useEffect(() => {
//     // Reset state when files change
//     setUploadProgress({});
//     setUploadComplete({});
//   }, [files]);

//   const onDrop = (acceptedFiles) => {
//     const newFiles = acceptedFiles.map((file) => ({
//       file,
//       uploadProgress: 0,
//       uploadComplete: false,
//     }));
//     setFiles([...files, ...newFiles]);
//     newFiles.forEach((newFile) => uploadFile(newFile));
//   };

//   const uploadFile = async (uploadingFile) => {
//     const totalSteps = 100;
//     let currentStep = 0;

//     const interval = setInterval(() => {
//       currentStep += 1;
//       const updatedProgress = (currentStep / totalSteps) * 100;

//       setUploadProgress((prevProgress) => ({
//         ...prevProgress,
//         [uploadingFile.file.name]: updatedProgress,
//       }));

//       if (currentStep === totalSteps) {
//         clearInterval(interval);
//         setUploadComplete((prevComplete) => ({
//           ...prevComplete,
//           [uploadingFile.file.name]: true,
//         }));
//       }
//     }, 100);
//   };

//   const removeFile = (fileName) => {
//     alert(fileName);
    
//     // Log the original names
//     console.log("Original Names:");
//     files.forEach(file => console.log(file.file.name));
  
//     const updatedFiles = files.filter((file) => 
//       file.file.name.trim().toLowerCase() !== fileName.trim().toLowerCase()
//     );
    
//     // Log the updated names after filtering
//     console.log("\nUpdated Names:");
//     updatedFiles.forEach(file => console.log(file.file.name));
    
//     // setFiles(updatedFiles);
//   };
  
  

//   const handleViewFile = (file) => {
//     window.open(URL.createObjectURL(file), '_blank');
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: '.pdf',
//     disabled: Object.values(uploadComplete).includes(false),
//   });

//   return (
//     <div>
//       {!Object.values(uploadComplete).includes(true) && (
//         <div {...getRootProps()} style={dropzoneStyle}>
//           <input {...getInputProps()} style={{ width: '20%' }} />
//         </div>
//       )}

//       {files.map((uploadedFile) => (
//         <div key={uploadedFile.file.name}>
//           {uploadComplete[uploadedFile.file.name] ? (
//             <div>
//               <p>File uploaded successfully: {uploadedFile.file.name}</p>
//               <button onClick={() => removeFile(uploadedFile.file.name)}>Remove File</button>
//               <button onClick={() => handleViewFile(uploadedFile.file)}>View File</button>
//             </div>
//           ) : (
//             <div>
//               <progress value={uploadProgress[uploadedFile.file.name] || 0} max="100" />
//               <p>{(uploadProgress[uploadedFile.file.name] || 0).toFixed(2)}%</p>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// const dropzoneStyle = {
//   border: '2px dashed #cccccc',
//   borderRadius: '4px',
//   padding: '20px',
//   textAlign: 'center',
//   cursor: 'pointer',
// };

// export default FileUpload;






// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadComplete, setUploadComplete] = useState(false);

//   const onDrop = (acceptedFiles) => {
//     const selectedFile = acceptedFiles[0];
//     setFile(selectedFile);
//     uploadFile(selectedFile);
//   };

//   const uploadFile = async (file) => {
//     // Simulate the upload process with a timeout
//     const totalSteps = 100;
//     let currentStep = 0;

//     const interval = setInterval(() => {
//       currentStep += 1;
//       setUploadProgress((currentStep / totalSteps) * 100);

//       if (currentStep === totalSteps) {
//         clearInterval(interval);
//         setUploadComplete(true);
//       }
//     }, 100);
//   };

//   const removeFile = () => {
//     setFile(null);
//     setUploadProgress(0);
//     setUploadComplete(false);
//   };

//   const handleFileChange = () => {
//     // Reset the state when the user clicks "Change File"
//     setFile(null);
//     setUploadProgress(0);
//     setUploadComplete(false);
//   };

//   const handleViewFile = () => {
//     // Open the uploaded file in a new tab
//     window.open(URL.createObjectURL(file), '_blank');
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: '.pdf', // Specify accepted file type as PDF
//     disabled: uploadComplete, // Disable dropzone when upload is complete
//   });

//   return (
//     <div>
//       {!uploadComplete && (
//         <div {...getRootProps()} style={dropzoneStyle}>
//           <input {...getInputProps()} />
//           <p>Drag & drop a PDF file here, or click to select a PDF file</p>
//         </div>
//       )}

//       {uploadComplete && (
//         <div>
//           <p>File uploaded successfully: {file.name}</p>
//           <button onClick={removeFile}>Remove File</button>
//           <button onClick={handleFileChange}>Change File</button>
//           <button onClick={handleViewFile}>View File</button>
//         </div>
//       )}

//       {!uploadComplete && file && (
//         <div>
//           <progress value={uploadProgress} max="100" />
//           <p>{uploadProgress.toFixed(2)}%</p>
//         </div>
//       )}

//       {file && !uploadComplete && <p>Preview of the PDF file</p>}
//     </div>
//   );
// };

// const dropzoneStyle = {
//   border: '2px dashed #cccccc',
//   borderRadius: '4px',
//   padding: '20px',
//   textAlign: 'center',
//   cursor: 'pointer',
// };
// export default FileUpload;


import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadComplete, setUploadComplete] = useState(false);

  useEffect(() => {
    // Reset state when files change
    setUploadProgress({});
    setUploadComplete(false);
  }, [files]);

  const onDrop = (acceptedFiles) => {
    const updatedFiles = acceptedFiles.map((file) => ({
      file,
      progress: 0,
      completed: false,
    }));
    setFiles([...files, ...updatedFiles]);
    uploadFiles(updatedFiles);
  };

  const uploadFiles = (uploadedFiles) => {
    const totalSteps = 100;

    uploadedFiles.forEach((uploadedFile, index) => {
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep += 1;
        uploadedFile.progress = (currentStep / totalSteps) * 100;

        if (currentStep === totalSteps) {
          clearInterval(interval);
          uploadedFile.completed = true;
          const updatedFiles = [...files];
          updatedFiles[index] = uploadedFile;
          setFiles(updatedFiles);
          checkAllFilesUploaded();
        } else {
          const updatedFiles = [...files];
          updatedFiles[index] = uploadedFile;
          setFiles(updatedFiles);
        }
      }, 100);
    });
  };

  const removeFile = (index) => {
    const filteredFiles = files.filter((_, i) => i !== index);
    setFiles(filteredFiles);
  };

  const handleViewFile = (file) => {
    // Open the uploaded file in a new tab
    window.open(URL.createObjectURL(file), '_blank');
  };

  const checkAllFilesUploaded = () => {
    const isAllUploaded = files.every((file) => file.completed);
    if (isAllUploaded) {
      setUploadComplete(true);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf',
    disabled: uploadComplete,
    multiple: true, // Allow multiple file uploads
  });

  return (
    <div>
      {!uploadComplete && (
        <div {...getRootProps()} style={dropzoneStyle}>
          <input {...getInputProps()} style={{ width: '20%' }} />
          <p>Drag & drop PDF files here, or click to select PDF files</p>
        </div>
      )}

      {files.map((uploadedFile, index) => (
        <div key={index}>
          {uploadedFile.completed && (
            <div>
              <p>File uploaded successfully: {uploadedFile.file.name}</p>
              <button onClick={() => removeFile(index)}>Remove File</button>
              <button onClick={() => handleViewFile(uploadedFile.file)}>
                View File
              </button>
            </div>
          )}

          {!uploadedFile.completed && (
            <div>
              <p>{uploadedFile.file.name}</p>
              <progress value={uploadedFile.progress} max="100" />
              <p>{uploadedFile.progress.toFixed(2)}%</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default FileUpload;
