import { RegisterOptions, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { getRules, Schema } from 'src/utils/rules'
import { schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

interface FormState {
  email: string
  password: string
  confirm_password: string
}

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<Schema>({
    resolver: yupResolver(schema)
  })

  // const rules = getRules(getValues)

  const onSubmit = handleSubmit(
    (data) => {
      console.log('data=========', data)
    },
    (data) => {
      // const password = getValues('password')
      console.log('errors=========', errors)
    }
  )

  // console.log('errors=========', errors)
  // const formValue = watch('email')
  // console.log('formValue=========', formValue)

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-12 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>

              <Input
                type='email'
                classNameParent='mt-8'
                classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                placeholder='Email'
                autoComplete='on'
                errorMessage={errors.email?.message}
                name='email'
                register={register}
                // rules={rules.email}
              />

              {/* <input
                  type='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Email'
                  {...register('email', rules.email as RegisterOptions<FormData, 'email'>)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>*/}

              <Input
                type='password'
                classNameParent='mt-2'
                classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                placeholder='Password'
                autoComplete='on'
                errorMessage={errors.password?.message}
                name='password'
                register={register}
                // rules={rules.password}
              />
              {/* <input
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Password'
                  autoComplete='on'
                  {...register('password', rules.password as RegisterOptions<FormData, 'password'>)}
                /> */}
              {/* <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div> */}

              <Input
                type='password'
                classNameParent='mt-2'
                classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                placeholder='Confirm password'
                autoComplete='on'
                errorMessage={errors.confirm_password?.message}
                name='confirm_password'
                register={register}
                // rules={rules.confirm_password}
              />
              {/* <input
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Confirm password'
                  autoComplete='on'
                  {...register(
                    'confirm_password',
                    // {
                    // ...rules.password,
                    // validate: (value) => {
                    //   return value === getValues('password') || 'Nhập lại confirm password'
                    // }
                    // }
                    rules.confirm_password as RegisterOptions<FormData, 'confirm_password'>
                  )}
                /> */}
              {/* <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div> */}

              <div className='mt-2'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>
              <div className='flex items-center justify-center gap-1 mt-2'>
                <span className='text-slate-400'>Bạn đã có tài khoản?</span>
                <Link to='/login' className='text-slate-400'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
