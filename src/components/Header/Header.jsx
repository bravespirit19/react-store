import { useSelector } from 'react-redux';
import s from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const cart = useSelector(state => state.store.cart)
  const location = useLocation(); 
  const showCartCounter = (cart.length && location.pathname === '/' || location.pathname === '/order/cart')

  return (
    <header>
      <div className={s.container}>
        <div className={s.header_row}>
          <Link to="/" className={s.logo_wrap}>
            <img src="/logo.svg" alt="logo" />
            <p>Store123</p>
          </Link>
          <div className={s.button_wrap}>
            <Link to="/cart" className={s.cart_button}>
              <img src="/cart.svg" alt="" />
              <span>Cart</span>
            </Link>
            {showCartCounter && <span className={s.cart_item_counter}>{cart.length}</span>}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;