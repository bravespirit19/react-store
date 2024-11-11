import { Link } from 'react-router-dom';
import s from './Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseProductQuantity, deleteFromCart, setContactInfo } from '../../../store/storeSlice';

const isSNeeded = (quantity) => quantity > 1 ? 's' : '';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.store.cart);

  const totalPrice = cart.reduce((acc, { price }) => {
    return acc + price;
  }, 0)
  
  const handleNextStepBtn = () => {
    dispatch(setContactInfo())
  }
  const handleDeleteBtn = (id) => {
    dispatch(deleteFromCart({ id }))
  }
  const handlePlusBtn = (id) => {
    dispatch(addToCart({ id }))
  }

  const handleMinusBtn = (id, quantity) => {
    if (quantity > 1) dispatch(decreaseProductQuantity({ id }))
  }

  const generateProducts = () => {
    let itemIds = [];
    return cart.map(({ id, images, title, quantity, price }) => {
      if (!itemIds.includes(id)) {
        itemIds.push(id)
        return (
          <div className={s.product} key={id}>
            <img className={s.product_img} src={images[0]} alt="" />
            <div className={s.product_desc}>
              <div className={s.desc_part}>
                <div className={s.product_title}>{title}</div>
                <button className={s.product_delete} onClick={() => handleDeleteBtn(id)}>
                  <img src="/trash-can.svg" alt="" />
                  <span>Delete</span>
                </button>
              </div>
              <div className={s.desc_part}>
                <div className={s.product_counter}>
                  <button className={quantity <= 1 ? s.counter_btn_disabled : s.counter_btn} onClick={() => handleMinusBtn(id, quantity)}>
                    <img src="/minus-white.svg" alt="minus" />
                  </button>
                  <div className={s.counter_value}>{quantity}</div>
                  <button className={s.counter_btn} onClick={() => handlePlusBtn(id)}>
                    <img src="/plus.svg" alt="plus" />
                  </button>
                </div>
                <div className={s.product_price}>
                  <span>Price:</span>${price}
                </div>
              </div>
            </div>
          </div>
        )
      }
    })
  }

  return (
    <section>
      <h2>Cart</h2>
      <div className={s.cart_wrap}>
        <div className={s.cart_products}>
          {generateProducts()}
        </div>
        <div className={s.counting}>
          <div className={s.counting_wrap}>
            <span className={s.counting_title}>Together:</span>
            <span className={s.counting_value}>{`${cart.length} product${isSNeeded(cart.length)}`}</span>
          </div>
          <div className={s.counting_wrap}>
            <span className={s.counting_title}>Sum:</span>
            <span className={s.counting_value}>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <Link to='/order/contact-info' className={`${cart.length < 1 ? s.disabled : ''} ${s.next_step_btn}`} onClick={handleNextStepBtn}>Next Step</Link>
      </div>
    </section>
  )
}

export default Cart;