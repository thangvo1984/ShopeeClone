import React from 'react'
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameParent?: string
  classNameError?: string
  errorMessage?: string
}

const InputNumber = React.forwardRef<HTMLInputElement, Props>(
  ({ errorMessage, classNameParent, classNameInput, classNameError, onChange, ...rest }: Props, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      if ((/^\d+$/.test(value) || value === '') && onChange) {
        onChange(event)
      }
    }

    return (
      <div className={classNameParent}>
        <input {...rest} className={classNameInput} onChange={handleChange} ref={ref} />
        <div className={classNameError ? classNameError : 'mt-1 text-red-600 min-h-[1.25rem] text-sm'}>
          {errorMessage}
        </div>
      </div>
    )
  }
)

export default InputNumber
