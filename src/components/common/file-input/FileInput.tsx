import { FC, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { ReactComponent as FileUploadIcon } from '../../assets/file-upload.svg';

interface FileInputProps extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {}

export const FileInput: FC<FileInputProps> = ({ className, ...inputProps }) => {
  return (
    <label
      className={`
        px-2 py-1 w-40
        flex space-x-2 justify-center items-center
        bg-primary hover:bg-secondary text-white
        rounded-lg
        border border-blue
        cursor-pointer
        ${className || ''}
      `}
    >
      <FileUploadIcon className="h-6" />
      <span>Select a file</span>
      <input type="file" className="hidden" {...inputProps} />
    </label>
  );
};
