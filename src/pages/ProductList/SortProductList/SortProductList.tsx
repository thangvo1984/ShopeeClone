import classNames from 'classnames'
import { omit } from 'lodash'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import { path } from 'src/constant/path'
import { sortBy, order as orderConstant } from 'src/constant/product'
import { QueryConfig } from 'src/pages/ProductList/ProductList'
import { ProductListConfig } from 'src/types/product.type'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const SortProductList = ({ queryConfig, pageSize }: Props) => {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig

  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center gap-2 justify-between'>
        <div className='flex flex-wrap gap-2 items-center'>
          <div>Sắp xếp theo</div>
          <Button
            className={classNames('py-2 px-4 text-sm h-8 capitalize', {
              ' bg-orange hover:bg-orange/70 text-white': isActiveSortBy(sortBy.view),
              ' bg-white  hover:bg-slate-100 text-black': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </Button>
          <Button
            className={classNames('py-2 px-4 text-sm h-8 capitalize', {
              ' bg-orange hover:bg-orange/70 text-white': isActiveSortBy(sortBy.createdAt),
              ' bg-white  hover:bg-slate-100 text-black': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </Button>
          <Button
            className={classNames('py-2 px-4 text-sm h-8 capitalize', {
              ' bg-orange hover:bg-orange/70 text-white': isActiveSortBy(sortBy.sold),
              ' bg-white  hover:bg-slate-100 text-black': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </Button>
          <select
            className={classNames('py-2 px-4 text-sm h-8 text-left outline-none', {
              ' bg-orange hover:bg-orange/70 text-white': isActiveSortBy(sortBy.price),
              ' bg-white  hover:bg-slate-100 text-black': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled>
              Giá
            </option>
            <option value={orderConstant.asc}>Giá: Thấp đến cao</option>
            <option value={orderConstant.desc}>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>

            <span>/{pageSize}</span>
          </div>
          <div className='ml-2'>
            {page === 1 ? (
              <span className='shadow px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed'>
                {'<'}
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='shadow px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100'
              >
                {'<'}
              </Link>
            )}

            {page === pageSize ? (
              <span className='shadow px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed'>
                {'>'}
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='shadow px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100'
              >
                {'>'}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
