import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameParent?: string
  classNameError?: string
  errorMessage?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

const Input = ({
  type,
  errorMessage,
  placeholder,
  classNameParent,
  classNameInput,
  name,
  register,
  rules,
  autoComplete,
  classNameError
}: InputProps) => {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={classNameParent}>
      <input
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registerResult}
      />
      <div className={classNameError ? classNameError : 'mt-1 text-red-600 min-h-[1.25rem] text-sm'}>
        {errorMessage}
      </div>
    </div>
  )
}

export default Input
