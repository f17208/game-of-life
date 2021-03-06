import { FC, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FileUploadIcon } from '../icons';

import { Typography } from '../typography/Typography';

interface FileInputProps extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {}

export const FileInput: FC<FileInputProps> = ({ className, disabled, ...inputProps }) => {
  return (
    <label
      className={`
        px-2 py-1 w-40
        flex space-x-2 justify-center items-center
        bg-primary text-white
        rounded-lg
        border border-blue
        ${className || ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-secondary'}
      `}
    >
      <FileUploadIcon className="h-6 fill-white w-fit" />
      <Typography>Select a file</Typography>
      <input type="file" className="hidden" {...inputProps} disabled={disabled} />
    </label>
  );
};
