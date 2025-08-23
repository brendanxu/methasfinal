'use client';

import React, { useState, useRef } from 'react';
import { PhotoIcon, XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string, metadata?: any) => void;
  category?: string;
  label?: string;
  required?: boolean;
  multiple?: boolean;
}

interface UploadedImage {
  url: string;
  filename: string;
  size: number;
  uploadedAt: string;
}

export default function ImageUpload({
  value,
  onChange,
  category = 'general',
  label = '上传图片',
  required = false,
  multiple = false
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        const imageData = result.data;
        onChange(imageData.url, imageData);
        
        // 添加到已上传列表
        setUploadedImages(prev => [...prev, {
          url: imageData.url,
          filename: imageData.filename,
          size: imageData.size,
          uploadedAt: imageData.uploadedAt
        }]);
      } else {
        alert('上传失败: ' + result.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeImage = () => {
    onChange('');
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* 当前图片预览 */}
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="已上传图片"
            className="w-32 h-32 object-cover rounded-xl border border-gray-200"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 上传区域 */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'opacity-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
        />

        <div className="space-y-2">
          {uploading ? (
            <>
              <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-blue-500 animate-pulse" />
              <p className="text-sm text-gray-600">正在上传...</p>
            </>
          ) : (
            <>
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="space-y-1">
                <p className="text-sm text-gray-900">
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:text-blue-500"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    点击上传
                  </button>
                  {' '}或拖拽文件到此处
                </p>
                <p className="text-xs text-gray-500">
                  支持 PNG, JPG, WebP 格式，最大 5MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 最近上传的图片 */}
      {uploadedImages.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">最近上传</h4>
          <div className="space-y-2">
            {uploadedImages.map((img, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {img.filename}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(img.size)} • {new Date(img.uploadedAt).toLocaleString('zh-CN')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onChange(img.url)}
                  className="text-xs bg-white border border-gray-200 rounded px-2 py-1 hover:bg-gray-50"
                >
                  使用此图片
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}