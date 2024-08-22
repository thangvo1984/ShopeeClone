import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import productApi from 'src/apis/product.api'
import purchaseApi from 'src/apis/purchase.api'
import ProductRating from 'src/components/ProductRating'
import QuantityController from 'src/components/QuantityController'
import { purchasesStatus } from 'src/constant/purchase'
import { queryClient } from 'src/main'
import Product from 'src/pages/ProductList/Product'
import { IProduct, ProductListConfig } from 'src/types/product.type'
import { formatNumberCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/util'

const ProductDetail = () => {
  const { nameId } = useParams()
  const [buyCount, setBuyCount] = useState(1)

  // const id = nameId ? getIdFromNameId(nameId) : ''
  const id = getIdFromNameId(nameId!)

  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])

  const product = productDetailData?.data.data
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImage) : []),
    [product, currentIndexImage]
  )
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)

  const queryConfig = { limit: '20', page: '1', category: product?.category._id }

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const next = () => {
    if (currentIndexImage[1] < (product as IProduct).images.length) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const image = imageRef.current as HTMLImageElement
    const rect = event.currentTarget.getBoundingClientRect()

    const { naturalWidth, naturalHeight } = image

    //Cach 1
    const { offsetX, offsetY } = event.nativeEvent

    //Cach 2
    // const offsetX = event.pageX - (rect.x + window.scrollX)
    // const offsetY = event.pageX - (rect.y + window.scrollY)

    const top = offsetY * (1 - (naturalHeight * 1) / rect.height)
    const left = offsetX * (1 - (naturalWidth * 1) / rect.width)
    image.style.width = naturalWidth * 1 + 'px'
    image.style.height = naturalHeight * 1 + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const image = imageRef.current as HTMLImageElement
    image.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.addToCart(body),
    onError: () => {}
  })

  const addToCart = () => {
    addToCartMutation.mutate(
      {
        buy_count: buyCount,
        product_id: product?._id as string
      },
      {
        onSuccess: () => {
          toast.success('Thêm vào giỏ hàng thành công', { autoClose: 1000 })
          queryClient.invalidateQueries({
            queryKey: ['purchases', { status: purchasesStatus.inCart }]
          })
        }
      }
    )
  }

  // console.log('product========', product)
  if (!product) {
    return null
  }

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9 pt-2'>
            <div className='col-span-5'>
              <div
                className='relative w-full pt-[100%] shadow overflow-hidden cursor-zoom-in'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product?.name}
                  className='absolute top-0 left-0 h-full w-full bg-white object-cover pointer-events-none
                  '
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img, index) => {
                  const isActive = img === activeImage
                  return (
                    <div
                      className={classNames('relative w-full pt-[100%]', {
                        'border-2 border-orange': isActive,
                        'border-none': !isActive
                      })}
                      key={index}
                      onMouseEnter={() => chooseActive(img)}
                    >
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer object-cover'
                      />
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassname='fill-orange text-orange h-4 w-4'
                    nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                {/* <div>
                <span>{formatNumberToSocialStyle(product.quantity)}</span>
                <span className='ml-1'>Đánh giá</span>
              </div> */}
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>đ{formatNumberCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>đ{formatNumberCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  classNameWrapper=' ml-2'
                  max={product.quantity}
                  // value={buyCount}
                  // onDecrease={handleBuyCount}
                  // onIncrease={handleBuyCount}
                  // onType={handleBuyCount}
                />
                <div className='ml-6 text-sm text-gray-500'>
                  {formatNumberCurrency(product.quantity)} sản phẩm có sẵn
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'
                  onClick={addToCart}
                >
                  <img
                    alt='icon-add-to-cart'
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/0f3bf6e431b6694a9aac.svg'
                  />
                  Thêm vào giỏ hàng
                </button>
                <button className='ml-4 flex h-12 min-2-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white  shadow-sm outline-none hover:bg-orange/90'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
                // __html: DOMPurify.sanitize(`<div onClick={alert('OK')}>hehehe</div>`)
                // __html: `<div onClick={alert('OK')}>hehehe</div>`
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='uppercase text-gray-400'>Các sản phẩm liên quan</div>
          <div className='mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
            {productsData &&
              productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
