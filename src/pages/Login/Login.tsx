import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { path } from 'src/constant/path'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { loginSchema, LoginSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/util'

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema)
  })

  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: (body: LoginSchema) => authApi.login(body),
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<ErrorResponse<LoginSchema>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            console.log('formError=========', formError)
            console.log('key=========', key)
            console.log('errors=========', formError[key as keyof LoginSchema])

            setError(key as keyof LoginSchema, {
              message: formError[key as keyof LoginSchema],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const onSubmit = handleSubmit(
    (data) => {
      console.log('data=========', data)
      loginMutation.mutate(data, {
        onSuccess(data) {
          setIsAuthenticated(true)
          setProfile(data.data.data.user)
          navigate('/')
        },
        onError(error) {
          if (isAxiosUnprocessableEntityError<ErrorResponse<LoginSchema>>(error)) {
            const formError = error.response?.data.data

            if (formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof LoginSchema, {
                  message: formError[key as keyof LoginSchema],
                  type: 'Server'
                })
              })
            }
          }
        }
      })
    },
    (data) => {
      console.log('errors=========', data)
    }
  )

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-12 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                type='email'
                classNameParent='mt-8'
                classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                placeholder='Email'
                autoComplete='on'
                name='email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                type='password'
                classNameParent='mt-2'
                classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                placeholder='Password'
                autoComplete='on'
                errorMessage={errors.password?.message}
                name='password'
                register={register}
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='flex items-center justify-center gap-1 mt-3'>
                <span className='text-slate-400'>Bạn chưa có tài khoản?</span>
                <Link to={path.register} className='text-slate-400'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
