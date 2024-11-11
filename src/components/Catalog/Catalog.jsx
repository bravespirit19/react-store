import { useEffect } from 'react'
import s from './Catalog.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../store/storeSlice'
import ProductItem from './ProductItem/ProductItem'

const Catalog = () => {
  const dispatch = useDispatch();
  const { products, fetchStatus, cart } = useSelector(state => state.store)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  return (
    <section className={s.catalog_wrap}>
      {fetchStatus === 'resolved' && products.map(({id, images, title, price}) => {
        const inCart = cart.some(cartItem => cartItem.id === id)
        return (
          <ProductItem
            key={id}
            id={id}
            image={images[0]}
            title={title}
            price={price}
            inCart={inCart} />
        )
      })}
    </section>
  )
}

export default Catalog;

