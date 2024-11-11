import { NavLink, Route, Routes } from 'react-router-dom';
import s from './OrderPath.module.css';
import Cart from './Cart/Cart';
import ContactInfo from './ContactInfo/ContactInfo';
import { useSelector } from 'react-redux';
import ShipmentInfo from './ShipmentInfo/ShipmentInfo';

const OrderPath = () => {
  const isContactLinkAvaliable = useSelector(state => state.store.isContactInfoAvaliable);
  const isShipmentLinkAvaliable = useSelector(state => state.store.isShipmentInfoAvaliable)

  const getLinkClassname = (isActive, isLinkAvaliable) => {
    if (!isLinkAvaliable) return `${s.disabled}`
    return isActive ? s.active : ''
  }
  
  return (
    <div className={s.container}>
      <section>
        <div className={s.path}>
          <NavLink to='cart' className={({ isActive }) => isActive ? s.active : ''}>Cart</NavLink>
          <span>&gt;</span>
          <NavLink to='contact-info' className={({ isActive }) => getLinkClassname(isActive, isContactLinkAvaliable)}>Contact information</NavLink>
          <span>&gt;</span>
          <NavLink to='shipment-info' className={({ isActive }) => getLinkClassname(isActive, isShipmentLinkAvaliable)}>Shipment information</NavLink>
        </div>
      </section>
      <Routes>
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact-info' element={<ContactInfo />} />
        <Route path='/shipment-info' element={<ShipmentInfo />}/>
      </Routes>
    </div>
  );
}

export default OrderPath;