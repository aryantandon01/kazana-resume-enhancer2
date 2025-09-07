'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useEnhancementStore } from '@/store/enhancement-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function FileUpload() {
  const { createSession } = useEnhancementStore();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      setError(rejectedFiles[0].errors[0].message);
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      // Create uploaded file object
      const uploadedFile = {
        id: uuidv4(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
      };

      // Create session and start processing
      createSession(uploadedFile);

      // Start file parsing
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process file');
      }

      const result = await response.json();
      console.log('File processed:', result);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
      setUploading(false);
    }
  }, [createSession]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: uploading,
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI-Powered Resume Enhancer
        </h1>
        <p className="text-xl text-gray-600">
          Upload your existing resume and let our AI agents enhance it for better results
        </p>
      </div>

      <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <CardContent className="p-8">
          <div {...getRootProps()} className={`cursor-pointer ${uploading ? 'pointer-events-none opacity-50' : ''}`}>
            <input {...getInputProps()} />
            <div className="text-center">
              {uploading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                  <p className="text-lg text-blue-600">Processing your resume...</p>
                  <p className="text-sm text-gray-500 mt-2">Our AI agents are analyzing your file</p>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  {isDragActive ? (
                    <p className="text-lg text-blue-600">Drop your resume here...</p>
                  ) : (
                    <div>
                      <p className="text-lg text-gray-600 mb-2">
                        Drag and drop your resume here, or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports PDF, Word (.docx, .doc), and Text files up to 10MB
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Upload Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                onClick={() => setError(null)}
              >
                Try Again
              </Button>
            </div>
          )}

          {fileRejections.length > 0 && !error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">File Rejected</h3>
                  {fileRejections.map(({ file, errors }) => (
                    <div key={file.name} className="mt-1">
                      <p className="text-sm text-red-700">
                        {file.name}: {errors[0].message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900">Smart Analysis</h3>
              <p className="text-sm text-gray-600 mt-1">
                AI agents analyze every section for improvement opportunities
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Targeted Enhancement</h3>
              <p className="text-sm text-gray-600 mt-1">
                Get specific improvements for each resume section
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900">ATS Optimization</h3>
              <p className="text-sm text-gray-600 mt-1">
                Optimized for applicant tracking systems and recruiters
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
