import { Link } from 'react-router-dom'
import { path } from 'src/constant/path'

const UserSideNav = () => {
  return (
    <div>
      <div className='flex items-center border-b-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img
            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/0f3bf6e431b6694a9aac.svg'
            alt=''
            className='h-full w-full object-cover'
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>
            cdthanh
            <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
              <svg width='16px' height='16px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <g>
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path d='M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z' />
                </g>
              </svg>
              Sửa hồ sơ
            </Link>
          </div>
        </div>
      </div>
      <div className='mt-7'>
        <Link to={path.profile} className='flex items-center capitalize text-orange transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/0f3bf6e431b6694a9aac.svg'
              alt=''
              className='h-full w-full object-cover'
            />
          </div>
          Tài khoản của tôi
        </Link>
        <Link to={path.changePassword} className='flex items-center capitalize text-orange transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/0f3bf6e431b6694a9aac.svg'
              alt=''
              className='h-full w-full object-cover'
            />
          </div>
          Đổi mật khẩu
        </Link>
        <Link to={path.historyPurchase} className='flex items-center capitalize text-orange transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/0f3bf6e431b6694a9aac.svg'
              alt=''
              className='h-full w-full object-cover'
            />
          </div>
          Đơn mua
        </Link>
      </div>
    </div>
  )
}

export default UserSideNav
