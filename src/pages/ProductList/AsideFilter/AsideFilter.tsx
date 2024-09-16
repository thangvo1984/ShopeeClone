import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { omit } from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import InputNumber from 'src/components/InputNumber'
import InputV2 from 'src/components/InputV2'
import RatingStarts from 'src/components/RatingStarts'
import { path } from 'src/constant/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { Category } from 'src/types/category.type'
import { NoUndefinedField } from 'src/types/utils.type'
import { schema, Schema } from 'src/utils/rules'
import { ObjectSchema } from 'yup'

interface Props {
  categories: Category[]
  queryConfig: QueryConfig
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_min', 'price_max'])

const AsideFilter = ({ categories, queryConfig }: Props) => {
  const { category } = queryConfig
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    trigger
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema as ObjectSchema<FormData>),
    shouldFocusError: false
  })
  const valueForm = watch()

  // console.log('valueFormlllllllllll', valueForm)
  // console.log('errorsllllllllll', errors)

  const isActivedCategory = (categoryValue: string) => {
    return category === categoryValue
  }

  const onSubmit = handleSubmit(
    (data) => {
      console.log('datalllllllllll', data)

      navigate({
        pathname: path.home,
        search: createSearchParams({
          ...queryConfig,
          price_max: data.price_max,
          price_min: data.price_min
        }).toString()
      })
    },
    (err) => {
      // if (err.price_max?.ref?.focus) {
      //   err.price_max.ref.focus()
      // }
    }
  )

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig
          },
          ['category', 'price_min', 'rating_filter', 'price_max']
        )
      ).toString()
    })
  }

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
        {categories &&
          categories.map((item) => (
            <li className='py-2 pl-2' key={item._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: item._id
                  }).toString()
                }}
                className={classNames('relative px-2', {
                  'text-orange font-semibold': isActivedCategory(item._id),
                  'text-black': !isActivedCategory(item._id)
                })}
              >
                {isActivedCategory(item._id) && (
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
                )}

                {item.name}
              </Link>
            </li>
          ))}
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
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            {/* <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='Từ'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    classNameError='hidden'
                  />
                )
              }}
            /> */}

            <InputV2
              control={control}
              name='price_min'
              type='number'
              className='grow'
              placeholder='Từ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              onChange={() => {
                trigger('price_max')
              }}
              classNameError='hidden'
            />

            <div className='mt-2 shrink-0'>-</div>
            {/* <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='Đến'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                    classNameError='hidden'
                  />
                )
              }}
            /> */}
            <InputV2
              control={control}
              name='price_max'
              type='number'
              className='grow'
              placeholder='Từ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              onChange={() => {
                trigger('price_min')
              }}
              classNameError='hidden'
            />
          </div>
          <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm text-center'>{errors.price_min?.message}</div>
          <Button className='text-white rounded-sm bg-orange hover:bg-orange/70 w-full h-8 p-2 uppercase text-sm'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='text-sm'>
        <RatingStarts queryConfig={queryConfig} />
      </div>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <Button
        className='w-full py-2 px-2 text-sm uppercase bg-orange hover:bg-orange/70 text-white'
        onClick={handleRemoveAll}
      >
        Xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
