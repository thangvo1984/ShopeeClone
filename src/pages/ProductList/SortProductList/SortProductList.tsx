import Button from 'src/components/Button'
import AsideFilter from 'src/pages/ProductList/AsideFilter'
import Product from 'src/pages/ProductList/Product'

const SortProductList = () => {
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center gap-2 justify-between'>
        <div className='flex flex-wrap gap-2 items-center'>
          <div>Sắp xếp theo</div>
          <Button className='py-2 px-4 text-sm bg-orange hover:bg-orange/70 text-white h-8 capitalize'>Phổ biến</Button>
          <Button className='py-2 px-4 text-sm bg-white hover:bg-slate-100 h-8 capitalize'>Mới nhất</Button>
          <Button className='py-2 px-4 text-sm bg-white hover:bg-slate-100 h-8 capitalize'>Bán chạy</Button>
          <select className='py-2 px-4 text-sm bg-white hover:bg-slate-100 h-8 text-left outline-none'>
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: Thấp đến cao</option>
            <option value='price:des'>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <Button className='shadow px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed'>
              {'<'}
            </Button>
            <Button className='shadow px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100 '>{'>'}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
