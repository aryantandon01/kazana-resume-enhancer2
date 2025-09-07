'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onUpload: (file: File) => void;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onUpload(file);
    }
  }, [onUpload]);

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
          <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <div className="text-center">
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
            </div>
          </div>

          {fileRejections.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Upload Error</h3>
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

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-medium">Smart Analysis</h3>
              <p className="text-sm text-gray-600">AI agents analyze every section</p>
            </div>
            <div className="text-center">
              <FileText className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-medium">Targeted Enhancement</h3>
              <p className="text-sm text-gray-600">Specific improvements for each area</p>
            </div>
            <div className="text-center">
              <FileText className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-medium">ATS Optimization</h3>
              <p className="text-sm text-gray-600">Optimized for applicant tracking systems</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
