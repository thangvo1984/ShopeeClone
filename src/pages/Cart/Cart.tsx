import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import { path } from 'src/constant/path'
import { purchasesStatus } from 'src/constant/purchase'
import { AppContext } from 'src/contexts/app.context'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatNumberCurrency, generateNameId } from 'src/utils/util'

const Cart = () => {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)

  const location = useLocation()
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId

  console.log('location=====', location)

  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart as PurchaseListStatus })
  })

  const buyProductMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, { autoClose: 1000 })
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: (_, variables) => {
      setExtendedPurchases(
        produce((draft) => {
          draft[variables.purchaseIndex].buy_count = variables.buy_count
          draft[variables.purchaseIndex].disabled = false
        })
      )
    },
    onError: (_, variables) => {
      setExtendedPurchases(
        produce((draft) => {
          draft[variables.purchaseIndex].disabled = false
        })
      )
    }
  })

  const purchasesInCart = purchasesInCartData?.data.data
  const isCheckedAll = useMemo(() => extendedPurchases.every((produce) => produce.checked), [extendedPurchases])
  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchasesCount = checkedPurchases.length

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendPurchaseObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosenPurchaseFromLocation || Boolean(extendPurchaseObject[purchase._id]?.checked),
            // checked: false,
            previousValue: purchase.buy_count
          }
        }) || []
      )
    })
  }, [purchasesInCart, choosenPurchaseIdFromLocation])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleCheckChange = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) => prev.map((produce) => ({ ...produce, checked: !isCheckedAll })))
  }

  const handleQuantity = (purchaseIndex: number, value: number, enabled: boolean) => {
    if (!enabled) {
      return
    }
    const purchase = extendedPurchases[purchaseIndex]
    const previousValue = purchase.buy_count

    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].disabled = true
        draft[purchaseIndex].previousValue = previousValue
      })
    )
    updatePurchaseMutation.mutateAsync({
      product_id: purchase.product._id,
      buy_count: value,
      purchaseIndex
    })
  }

  const handleTypeChange = (purchaseIndex: number) => (value: number) => {
    const purchase = extendedPurchases[purchaseIndex]
    const previousValue = purchase.buy_count

    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
        draft[purchaseIndex].previousValue = previousValue
      })
    )
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchases = () => () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIds)
  }

  const calculateTotal = useMemo(
    () => checkedPurchases.reduce((sum, purchase) => (sum = sum + purchase.price * purchase.buy_count), 0),
    [checkedPurchases]
  )

  const calculateTotalSave = useMemo(
    () =>
      checkedPurchases.reduce(
        (sum, purchase) => (sum = sum + (purchase.price_before_discount - purchase.price) * purchase.buy_count),
        0
      ),
    [checkedPurchases]
  )

  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductMutation.mutate(body)
    }
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
                      onChange={handleCheckAll}
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
            {extendedPurchases?.length > 0 && (
              <div className='my-3 rounded-sm bg-white p-5 shadow pb-2'>
                {extendedPurchases.map((purchase, index) => (
                  <div
                    key={purchase._id}
                    className='first:mt-0 mt-5 items-center last:mb-0 grid grid-cols-12 rounded-sm border border-gray-200 bg-white py-5 px-4 text-sm text-gray-500'
                  >
                    <div className='col-span-6'>
                      <div className='flex items-center'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-orange'
                            checked={purchase.checked}
                            onChange={handleCheckChange(index)}
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
                                className='line-clamp-2 text-left'
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
                            onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                            onDecrease={(value) => {
                              console.log('purchase.previousValue====', purchase.previousValue)

                              handleQuantity(index, value, Number(value) >= 1 && purchase.previousValue >= 1)
                            }}
                            onType={handleTypeChange(index)}
                            onFocusOut={(value) => {
                              handleQuantity(
                                index,
                                value,
                                value >= 1 && value <= purchase.product.quantity && value !== purchase.previousValue
                              )
                            }}
                            disabled={purchase.disabled}
                          />
                        </div>
                        <div className='col-span-1 text-orange font-semibold text-right'>
                          {formatNumberCurrency(purchase.product.price * purchase.buy_count)}
                        </div>
                        <div className='col-span-1'>
                          <button
                            className='bg-none text-black transition-colors hover:text-orange'
                            onClick={handleDelete(index)}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className='sticky bottom-0 mt-10 z-10 flex flex-col sm:flex-row sm:items-center 
        items-center rounded-sm bg-white p-5 border border-gray-100 shadow-md'
        >
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-orange'
                checked={isCheckedAll}
                onChange={handleCheckAll}
              />
            </div>
            <button className='mx-3 border-none bb-none'>{`Chọn tất cả (${extendedPurchases.length})`}</button>
            <button className='mx-3 border-none bb-none' onClick={handleDeleteManyPurchases()}>
              Xóa
            </button>
          </div>
          <div className='sm:ml-auto mt-5 flex flex-col sm:flex-row items-center sm:mt-0'>
            <div>
              <div className='flex items-center justify-end'>
                <div>{`Tổng thanh toán (${checkedPurchasesCount} sản phẩm):`}</div>
                <div className='ml-2 text-2xl text-orange'>{formatNumberCurrency(calculateTotal)}</div>
              </div>
              <div className='flex items-center justify-end text-sm'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='text-orange ml-6'>{formatNumberCurrency(calculateTotalSave)}</div>
              </div>
            </div>
            <div className='flex justify-end xs:w-full'>
              <Button
                className='bg-orange text-white flex justify-center items-center text-center h-10 w-40 ml-4 hover:bg-orange/80 mt-5 sm:mt-0'
                onClick={handleBuyPurchases}
                disabled={!checkedPurchases.length || buyProductMutation.isPending}
              >
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
