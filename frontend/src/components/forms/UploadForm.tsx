import { useState } from "react";
import { useDropzone } from "react-dropzone";

export function UploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    onDrop: (acceptedFiles) => {
      setFiles(prev => [...prev, ...acceptedFiles]);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    setIsProcessing(true);
    try {
      // TODO: Implement file upload and AI processing
      console.log('Processing files:', files);
    } catch (error) {
      console.error('Error processing files:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div>
          <p>{isDragActive ? "Drop your files here" : "Drag & drop your clothing photos here"}</p>
          <p>or click to select files</p>
        </div>
      </div>

      {files.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <span>{file.name}</span>
                <button type="button" onClick={() => setFiles(prev => prev.filter((_, i) => i !== index))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit" disabled={files.length === 0 || isProcessing}>
        {isProcessing ? "Processing..." : "Upload & Process"}
      </button>
    </form>
  );
}