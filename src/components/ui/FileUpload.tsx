import React, { useRef, useState } from "react";

interface FileUploadProps {
  label: string;
  onChange: (file: File | null) => void;
  value?: File | null;
  className?: string;
}

export function FileUpload({
  label,
  onChange,
  value,
  className,
  placeholder,
}: FileUploadProps & { placeholder?: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-1 w-full text-left  ${className}`}>
      <label
        className="text-xl font-medium text-[#57534E] mb-2 block p-0"
        style={{ marginBottom: value ? "1rem" : "0.5rem" }}
      >
        {label}
        {placeholder && (
          <span className="block text-sm font-normal text-gray-400 mt-1">
            {placeholder}
          </span>
        )}
      </label>
      <div
        className={`
                border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors
                ${
                  dragActive
                    ? "border-red-500 bg-red-50"
                    : "border-[#E5E5E5] bg-transparent"
                }
                h-[180px]
            `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        />

        {value ? (
          <div className="text-center">
            <p className="text-green-600 font-medium">{value.name}</p>
            <p className="text-xs text-gray-400 mt-1">
              {(value.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.9552 18.0221C34.97 18.022 34.985 18.022 35 18.022C39.9706 18.022 44 22.0588 44 27.0386C44 31.6796 40.5 35.5016 36 36M34.9552 18.0221C34.9848 17.6921 35 17.3579 35 17.0202C35 10.9339 30.0752 6 24 6C18.2465 6 13.5247 10.4253 13.0408 16.0638M34.9552 18.0221C34.7506 20.2952 33.8572 22.3692 32.4856 24.033M13.0408 16.0638C7.96796 16.5475 4 20.8278 4 26.0366C4 30.8834 7.43552 34.9264 12 35.8546M13.0408 16.0638C13.3565 16.0337 13.6765 16.0183 14 16.0183C16.2516 16.0183 18.3295 16.7639 20.001 18.022"
                stroke="#D6D3D1"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M24 26V42M24 26C22.5996 26 19.9831 29.9886 19 31M24 26C25.4004 26 28.017 29.9886 29 31"
                stroke="#D6D3D1"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p className="text-[#D4D4D4] font-medium text-lg">
              Select and Upload your
              <br />
              Files Here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
