import React, { useState } from 'react'
import { InputHTMLAttributes } from 'react'

export interface INumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameParent?: string
  classNameError?: string
  errorMessage?: string
}

const InputNumber = React.forwardRef<HTMLInputElement, INumberInputProps>(
  (
    { errorMessage, classNameParent, classNameInput, classNameError, onChange, value = '', ...rest }: INumberInputProps,
    ref
  ) => {
    const [localValue, setLocalValue] = useState<string>(value as string)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      if ((/^\d+$/.test(value) || value === '') && onChange) {
        onChange && onChange(event)
        setLocalValue(value)
      }
    }

    return (
      <div className={classNameParent}>
        <input {...rest} className={classNameInput} onChange={handleChange} ref={ref} value={value || localValue} />
        <div className={classNameError ? classNameError : 'mt-1 text-red-600 min-h-[1.25rem] text-sm'}>
          {errorMessage}
        </div>
      </div>
    )
  }
)

export default InputNumber
