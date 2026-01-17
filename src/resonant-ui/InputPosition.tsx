import React from 'react'
import {InputGroup} from './InputGroup'
import {InputTranslate} from './InputTranslate'
import {InputVec} from './InputVec'

// Mocking linearly vec2
export type vec2 = [number, number]

export interface InputPositionProps {
  [key: string]: any
}

interface Props extends InputPositionProps {
  value: vec2
  onChange: (value: vec2) => void
  onFocus?: () => void
  onBlur?: () => void
  onConfirm?: () => void
}

export const InputPosition: React.FC<Props> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onConfirm,
  ...props
}) => {
  return (
    <InputGroup className="gap-[3px]">
      <InputTranslate
        {...props}
        value={value}
        onChange={onChange}
        showOverlayLabel={true}
        onFocus={onFocus}
        onBlur={onBlur}
        onConfirm={onConfirm}
      />
      <InputVec
        {...props}
        value={value}
        onChange={onChange}
        icon={['char:X', 'char:Y']}
        onFocus={onFocus}
        onBlur={onBlur}
        onConfirm={onConfirm}
      />
    </InputGroup>
  )
}
