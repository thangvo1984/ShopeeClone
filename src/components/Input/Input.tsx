import { RegisterOptions, UseFormRegister } from 'react-hook-form'

type InputProps = {
  type: React.HTMLInputTypeAttribute
  classNameInput?: string
  classNameParent?: string
  placeholder?: string
  autoComplete: string
  errorMessage?: string
  name: string
  register: UseFormRegister<any>
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
  autoComplete
}: InputProps) => {
  return (
    <div className={classNameParent}>
      <input
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}

export default Input
