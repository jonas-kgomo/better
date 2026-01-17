import React from 'react';

interface InputVecProps {
  value: any;
  onChange: (value: any) => void;
  icon?: string[];
  onFocus?: () => void;
  onBlur?: () => void;
  onConfirm?: () => void;
  [key: string]: any;
}

export const InputVec: React.FC<InputVecProps> = (_props) => {
  return (
    <div className="border p-2 rounded bg-gray-100 text-sm">
      InputVec Placeholder
    </div>
  );
};
