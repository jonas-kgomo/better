import React from 'react';

interface InputTranslateProps {
  value: any;
  onChange: (value: any) => void;
  showOverlayLabel?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onConfirm?: () => void;
  [key: string]: any;
}

export const InputTranslate: React.FC<InputTranslateProps> = (_props) => {
  return (
    <div className="border p-2 rounded bg-gray-100 text-sm">
      InputTranslate Placeholder
    </div>
  );
};
