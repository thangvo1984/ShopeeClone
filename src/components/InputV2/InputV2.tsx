import React, { useState } from 'react'
import { InputHTMLAttributes } from 'react'
import { FieldValues, FieldPath, useController, UseControllerProps } from 'react-hook-form'

export interface INumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameParent?: string
  classNameError?: string
  errorMessage?: string
}

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & INumberInputProps) {
  const {
    type,
    onChange,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    classNameParent,
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== 'number') {
      setLocalValue(valueFromInput)
      field.onChange(event)
      onChange && onChange(event)
    }
  }

  return (
    <div className={classNameParent}>
      <input {...rest} {...field} className={classNameInput} onChange={handleChange} value={value || localValue} />
      <div className={classNameError ? classNameError : 'mt-1 text-red-600 min-h-[1.25rem] text-sm'}>
        {fieldState.error?.message}
      </div>
    </div>
  )
}

export default InputV2
