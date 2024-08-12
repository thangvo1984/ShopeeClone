import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { path } from 'src/constant/path'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { setProfileToLS } from 'src/utils/auth'
import { RegisterSchema as Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/util'

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Schema>({
    resolver: yupResolver(schema)
  })

  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<Schema, 'confirm_password'>) => authApi.registerAccount(body),
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<Schema, 'confirm_password'>>>(error)) {
        const formError = error.response?.data.data

        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof Omit<Schema, 'confirm_password'>, {
              message: formError[key as keyof Omit<Schema, 'confirm_password'>],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const onSubmit = handleSubmit(
    (data) => {
      const body = _.omit(data, ['confirm_password'])
      registerAccountMutation.mutate(body, {
        onSuccess(data) {
          setIsAuthenticated(true)
          setProfileToLS(data.data.data.user)

          navigate('/')
        },
        onError(error) {
          if (isAxiosUnprocessableEntityError<ErrorResponse<Schema>>(error)) {
            const formError = error.response?.data.data

            if (formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof Schema, {
                  message: formError[key as keyof Schema],
                  type: 'Server'
                })
              })
            }
          }
        }
      })
    },
    (data) => {
      console.log('errors=========', errors)
    }
  )

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
              <Input
                type='password'
                classNameParent='mt-2'
                classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                placeholder='Confirm password'
                autoComplete='on'
                errorMessage={errors.confirm_password?.message}
                name='confirm_password'
                register={register}
              />
              <div className='mt-2'>
                <Button
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Đăng ký
                </Button>
              </div>
              <div className='flex items-center justify-center gap-1 mt-2'>
                <span className='text-slate-400'>Bạn đã có tài khoản?</span>
                <Link to={path.login} className='text-slate-400'>
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
