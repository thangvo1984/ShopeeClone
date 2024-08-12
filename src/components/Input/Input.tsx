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
  errorMessage,
  classNameParent,
  classNameInput,
  name,
  register,
  rules,
  classNameError,
  ...rest
}: InputProps) => {
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className={classNameParent}>
      <input {...rest} className={classNameInput} {...registerResult} />
      <div className={classNameError ? classNameError : 'mt-1 text-red-600 min-h-[1.25rem] text-sm'}>
        {errorMessage}
      </div>
    </div>
  )
}

export default Input
