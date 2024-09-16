import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Popover from 'src/components/Popover'
import { path } from 'src/constant/path'
import { purchasesStatus } from 'src/constant/purchase'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'

const NavHeader = () => {
  const { setIsAuthenticated, isAuthenticated, profile } = useContext(AppContext)

  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess(data) {
      setIsAuthenticated(false)
      setProfileToLS(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    },
    onError(error) {
      console.log('error========', error)
    }
  })

  return (
    <div className='flex justify-end'>
      <Popover
        // as='span'
        className='flex items-center py-1 hover:text-white/70 cursor-pointer mr-6'
        renderPopover={
          <div className='shadow-md bg-white rounded-sm border border-gray-200'>
            <div className='flex flex-col py-2 pr-20'>
              <button className='hover:text-orange py-2 px-3'>Tiếng Việt</button>
              <button className='mt-2 hover:text-orange  py-2 px-3'>English</button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1'>Tiếng Việt</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>

      {isAuthenticated && (
        <Popover
          className='flex items-center py-1 hover:text-white/70 cursor-pointer'
          renderPopover={
            <div className='shadow-md bg-white rounded-sm border border-gray-200'>
              <Link
                to='/profile'
                className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
              >
                Tài khoản của tôi
              </Link>
              <Link
                to='/'
                className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500  w-full text-left'
              >
                Đơn mua
              </Link>
              <button
                type='button'
                onClick={() => logoutMutation.mutate()}
                className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500  w-full text-left'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='w-6 h-6 mr-2 flex-shrink-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6 w-full h-full rounded-full'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
          </div>
          <div>{profile?.email}</div>
        </Popover>
      )}

      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
            Đăng ký
          </Link>
          <div className='border-r-[1px] border-r-white/40 h-4'></div>
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}

export default NavHeader
