import { useQuery } from '@tanstack/react-query'
import { path } from 'src/constant/path'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import { purchasesStatus } from 'src/constant/purchase'
import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { formatNumberCurrency, generateNameId } from 'src/utils/util'
import QuantityController from 'src/components/QuantityController'
import Button from 'src/components/Button'
import { useEffect, useState } from 'react'
import { produce } from 'immer'

interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}

const Cart = () => {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart as PurchaseListStatus })
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const isCheckedAll = extendedPurchases.every((produce) => produce.checked)

  useEffect(() => {
    setExtendedPurchases(
      purchasesInCart?.map((purchase) => ({
        ...purchase,
        disabled: false,
        checked: false
      })) || []
    )
  }, [purchasesInCart])

  const handleCheckedChange = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[productIndex].checked = event.target.checked
      })
    )
  }

  const checkedAll = () => {
    setExtendedPurchases((prev) => prev.map((produce) => ({ ...produce, checked: !isCheckedAll })))
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isCheckedAll}
                      onChange={checkedAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow pb-2'>
              {extendedPurchases?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='first:mt-0 mt-5 last:mb-0 grid grid-cols-12 rounded-sm border border-gray-200 bg-white py-5 px-4 text-sm text-gray-500'
                >
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={purchase.checked}
                          onChange={handleCheckedChange(index)}
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            to={`${path.home}${generateNameId({
                              name: purchase.product.name,
                              id: purchase.product._id
                            })}`}
                            className='h-20 w-20 flex-shrink-0'
                          >
                            <img alt={purchase.product.name} src={purchase.product.image} />
                          </Link>
                          <div className='flex-grow px-2 pt-1 pb-2'>
                            <Link
                              to={`${path.home}${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                              className='line-clamp-2'
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='line-through text-gray-400'>
                            {formatNumberCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='ml-2 font-semibold'>{formatNumberCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          value={purchase.buy_count}
                          classNameWrapper='ml-0'
                          max={purchase.product.quantity}
                        />
                      </div>
                      <div className='col-span-1 text-orange font-semibold text-right'>
                        {formatNumberCurrency(purchase.product.price * purchase.buy_count)}
                      </div>
                      <div className='col-span-1'>
                        <button className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className='sticky bottom-0 mt-10 z-10 flex flex-col sm:flex-row sm:items-center 
        items-center rounded-sm bg-white p-5 border border-gray-100 shadow-md'
        >
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input type='checkbox' className='h-5 w-5 accent-orange' checked={isCheckedAll} onChange={checkedAll} />
            </div>
            <button className='mx-3 border-none bb-none'>Chọn tất cả</button>
            <button className='mx-3 border-none bb-none'>Xóa</button>
          </div>
          <div className='sm:ml-auto mt-5 flex flex-col sm:flex-row items-center sm:mt-0'>
            <div>
              <div className='flex items-center justify-end'>
                <div>Tổng thanh toán (0 sản phẩm):</div>
                <div className='ml-2 text-2xl text-orange'>130000</div>
              </div>
              <div className='flex items-center justify-end text-sm'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='text-orange ml-6'>130000</div>
              </div>
            </div>
            <div className='flex justify-end xs:w-full'>
              <Button className='bg-orange text-white flex justify-center items-center text-center h-10 w-40 ml-4 hover:bg-orange/80 mt-5 sm:mt-0'>
                Mua hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
