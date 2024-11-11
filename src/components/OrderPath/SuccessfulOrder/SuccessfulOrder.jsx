import { useNavigate } from 'react-router';
import s from './SuccessfulOrder.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { clearAllCart } from '../../../store/storeSlice';

const getTodayDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' })
  const year = date.getFullYear()

  const today = `${day} ${month} ${year}`
  return today;
}
const isSNeeded = (quantity) => quantity > 1 ? 's' : '';

const SuccessfulOrder = () => {
  const userInfo = useSelector(state => state.store.userContactInfo)
  const shipmentInfo = useSelector(state => state.store.userShipmentInfo)
  const cart = useSelector(state => state.store.cart)
  const totalPrice = cart.reduce((acc, { price }) => {
    return acc + price;
  }, 0)
  const generateProducts = () => {
    let itemIds = [];
    return cart.map(({ id, images, title, quantity, price }) => {
      if (!itemIds.includes(id)) {
        itemIds.push(id)
        return (
          <div className={s.product_item} key={id}>
            <img src={images[0]} alt="" />
            <div className={s.item_desc}>
              <p className={s.item_name}>{title}</p>
              <p className={s.item_price}>{`$${price}, ${quantity} product${isSNeeded(quantity)}`}</p>
            </div>
          </div>
        )
      }
    })
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBtnClick = () => {
    navigate('/');
    dispatch(clearAllCart())
  }

  return (
    <section>
      <div className={s.container}>
        <div className={s.order_header}>
          <img src="/successful-order-tick.svg" alt="tick" />
          <h2 className={s.thanks_title}>Thank you for your order!</h2>
          <p className={s.confirmation_info}>The order confirmation email with details of your order and a link to track its progress has been sent to your email address.</p>
          <p className={s.order_status}>Your order # is 00003 - PENDING</p>
          <p className={s.order_date}>Order Date: {getTodayDate()}</p>
        </div>

        <div className={s.order_info_row}>
          <div className={s.order_info}>
            <div className={s.info_title}>
              <img src="/user-icon.svg" alt="user" />
              <p>Contact information</p>
            </div>
            <div className={s.info_desc}>
              <p>{userInfo.username} {userInfo.lastname}</p>
              <p>{userInfo.email}</p>
              <p>{userInfo.phone}</p>
            </div>
          </div>
          <div className={s.order_info}>
            <div className={s.info_title}>
              <img src="/track.svg" alt="track" />
              <p>Shipment information</p>
            </div>
            <div className={s.info_desc}>
              <p>{shipmentInfo.address} {shipmentInfo.apartment && `, ${shipmentInfo.apartment}`}</p>
              <p>{shipmentInfo.city}, {shipmentInfo.state}, {shipmentInfo.zipCode}</p>
              <p>{shipmentInfo.country}</p>
            </div>
          </div>
        </div>

        <div className={s.order_summary}>
          <div className={s.summary_title}>
            <img src="/attention.svg" alt="attention" />
            <p>Order summary</p>
          </div>

          <div className={s.products_row}>
            {generateProducts()}
          </div>

          <div className={s.order_total}>
            <div className={s.total_string}>
              <p>Subtotal:</p>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className={s.total_string}>
              <p>Shipping & Handling:</p>
              <span>$0.00</span>
            </div>
            <div className={s.total_string}>
              <p>Tax:</p>
              <span>$0.00</span>
            </div>
            <div className={s.total_string}>
              <p><b>Grand Total:</b></p>
              <span><b>${totalPrice.toFixed(2)}</b></span>
            </div>
          </div>
        </div>

        <button onClick={handleBtnClick} className={s.continue_button}>Continue shopping</button>
      </div>
    </section>
  )
}

export default SuccessfulOrder;