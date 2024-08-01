import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { path } from 'src/constant/path'

const AsideFilter = () => {
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          aria-hidden='true'
          role='img'
          className='w-3 h-4 mr-3 fill-current'
          width='31.88'
          height={32}
          preserveAspectRatio='xMidYMid meet'
          viewBox='0 0 256 257'
        >
          <defs>
            <linearGradient id='IconifyId1813088fe1fbc01fb466' x1='-.828%' x2='57.636%' y1='7.652%' y2='78.411%'>
              <stop offset='0%' stopColor='#41D1FF' />
              <stop offset='100%' stopColor='#BD34FE' />
            </linearGradient>
            <linearGradient id='IconifyId1813088fe1fbc01fb467' x1='43.376%' x2='50.316%' y1='2.242%' y2='89.03%'>
              <stop offset='0%' stopColor='#FFEA83' />
              <stop offset='8.333%' stopColor='#FFDD35' />
              <stop offset='100%' stopColor='#FFA800' />
            </linearGradient>
          </defs>
          <path
            fill='url(#IconifyId1813088fe1fbc01fb466)'
            d='M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z'
          />
          <path
            fill='url(#IconifyId1813088fe1fbc01fb467)'
            d='M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z'
          />
        </svg>
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <ul>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 text-orange font-semibold'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              aria-hidden='true'
              role='img'
              className=' fill-orange w-2 h-2 absolute top-1 left-[-10px]'
              width='31.88'
              height={32}
              preserveAspectRatio='xMidYMid meet'
              viewBox='0 0 256 257'
            >
              <defs>
                <linearGradient id='IconifyId1813088fe1fbc01fb466' x1='-.828%' x2='57.636%' y1='7.652%' y2='78.411%'>
                  <stop offset='0%' stopColor='#41D1FF' />
                  <stop offset='100%' stopColor='#BD34FE' />
                </linearGradient>
                <linearGradient id='IconifyId1813088fe1fbc01fb467' x1='43.376%' x2='50.316%' y1='2.242%' y2='89.03%'>
                  <stop offset='0%' stopColor='#FFEA83' />
                  <stop offset='8.333%' stopColor='#FFDD35' />
                  <stop offset='100%' stopColor='#FFA800' />
                </linearGradient>
              </defs>
              <path
                fill='url(#IconifyId1813088fe1fbc01fb466)'
                d='M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z'
              />
              <path
                fill='url(#IconifyId1813088fe1fbc01fb467)'
                d='M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z'
              />
            </svg>
            Thời trang nam
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2'>
            Thời trang nữ
          </Link>
        </li>
      </ul>
      <Link to={path.home} className='flex items-center font-bold mt-4 '>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          aria-hidden='true'
          role='img'
          className='fill-current w-3 h-4 mr-3 '
          width='31.88'
          height={32}
          preserveAspectRatio='xMidYMid meet'
          viewBox='0 0 256 257'
        >
          <defs>
            <linearGradient id='IconifyId1813088fe1fbc01fb466' x1='-.828%' x2='57.636%' y1='7.652%' y2='78.411%'>
              <stop offset='0%' stopColor='#41D1FF' />
              <stop offset='100%' stopColor='#BD34FE' />
            </linearGradient>
            <linearGradient id='IconifyId1813088fe1fbc01fb467' x1='43.376%' x2='50.316%' y1='2.242%' y2='89.03%'>
              <stop offset='0%' stopColor='#FFEA83' />
              <stop offset='8.333%' stopColor='#FFDD35' />
              <stop offset='100%' stopColor='#FFA800' />
            </linearGradient>
          </defs>
          <path
            fill='url(#IconifyId1813088fe1fbc01fb466)'
            d='M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z'
          />
          <path
            fill='url(#IconifyId1813088fe1fbc01fb467)'
            d='M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z'
          />
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2'>
          <div className='flex items-start'>
            <Input
              type='text'
              className='grow'
              name='from'
              placeholder='Từ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
            <div className='mt-2 shrink-0'>-</div>
            <Input
              type='text'
              className='grow'
              name='to'
              placeholder='Đến'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
          </div>
          <Button className='text-white rounded-sm bg-orange hover:bg-orange/70 w-full h-8 p-2 uppercase text-sm'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='text-sm'>
        <ul className='my-3'>
          <li className='py-1 pl-2'>
            <Link to={''} className='flex items-center text-sm'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='fill-current w-3 h-4 mr-3 '
                    width='31.88'
                    height={32}
                    preserveAspectRatio='xMidYMid meet'
                    viewBox='0 0 256 257'
                    key={index}
                  >
                    <defs>
                      <linearGradient
                        id='IconifyId1813088fe1fbc01fb466'
                        x1='-.828%'
                        x2='57.636%'
                        y1='7.652%'
                        y2='78.411%'
                      >
                        <stop offset='0%' stopColor='#41D1FF' />
                        <stop offset='100%' stopColor='#BD34FE' />
                      </linearGradient>
                      <linearGradient
                        id='IconifyId1813088fe1fbc01fb467'
                        x1='43.376%'
                        x2='50.316%'
                        y1='2.242%'
                        y2='89.03%'
                      >
                        <stop offset='0%' stopColor='#FFEA83' />
                        <stop offset='8.333%' stopColor='#FFDD35' />
                        <stop offset='100%' stopColor='#FFA800' />
                      </linearGradient>
                    </defs>
                    <path
                      fill='url(#IconifyId1813088fe1fbc01fb466)'
                      d='M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z'
                    />
                    <path
                      fill='url(#IconifyId1813088fe1fbc01fb467)'
                      d='M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z'
                    />
                  </svg>
                ))}
              <div className='text-sm ml-1'></div>
            </Link>
          </li>
          <li className='py-1 pl-2'>
            <Link to={''} className='flex items-center text-sm'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='fill-current w-3 h-4 mr-3 '
                    width='31.88'
                    height={32}
                    preserveAspectRatio='xMidYMid meet'
                    viewBox='0 0 256 257'
                    key={index}
                  >
                    <defs>
                      <linearGradient
                        id='IconifyId1813088fe1fbc01fb466'
                        x1='-.828%'
                        x2='57.636%'
                        y1='7.652%'
                        y2='78.411%'
                      >
                        <stop offset='0%' stopColor='#41D1FF' />
                        <stop offset='100%' stopColor='#BD34FE' />
                      </linearGradient>
                      <linearGradient
                        id='IconifyId1813088fe1fbc01fb467'
                        x1='43.376%'
                        x2='50.316%'
                        y1='2.242%'
                        y2='89.03%'
                      >
                        <stop offset='0%' stopColor='#FFEA83' />
                        <stop offset='8.333%' stopColor='#FFDD35' />
                        <stop offset='100%' stopColor='#FFA800' />
                      </linearGradient>
                    </defs>
                    <path
                      fill='url(#IconifyId1813088fe1fbc01fb466)'
                      d='M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z'
                    />
                    <path
                      fill='url(#IconifyId1813088fe1fbc01fb467)'
                      d='M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z'
                    />
                  </svg>
                ))}
              <div className='text-sm ml-1'>Trở lên</div>
            </Link>
          </li>
        </ul>
      </div>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <Button className='w-full py-2 px-2 text-sm uppercase bg-orange hover:bg-orange/70 text-white'>Xóa tất cả</Button>
    </div>
  )
}

export default AsideFilter
