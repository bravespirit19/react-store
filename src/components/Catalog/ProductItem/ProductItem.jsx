import { useDispatch } from 'react-redux';
import s from './ProducsItem.module.css'
import { addToCart } from '../../../store/storeSlice';
import { useEffect, useState } from 'react';

const ProductItem = ({ image, title, price, id, inCart }) => {
  const dispatch = useDispatch();
  const [btnPressedStyle, setBtnPressedStyle] = useState(false)
  const handleClick = (id) => {
    dispatch(addToCart({ id }));
  }
  
  useEffect(() => {
    if(inCart) {
      setBtnPressedStyle(true)
    }
  }, [inCart] )

  return (
    <div className={s.product_item}>
      <img src={image} alt="product_img" className={s.product_image} />
      <h5>{title}</h5>
      <p>${price}</p>
      <button
        onClick={() => handleClick(id)} className={btnPressedStyle ? s.pressed : ''}
        disabled={btnPressedStyle.isPressed}>
        <img src={btnPressedStyle ? '/tick-grey.svg' : '/plus.svg'} alt="" />
        <span>{btnPressedStyle ? 'Added' : 'Add to cart'}</span>
      </button>
    </div>
  )
}

export default ProductItem;