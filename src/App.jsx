import { Routes, Route, Navigate } from 'react-router'
import './App.css'
import Catalog from './components/Catalog/Catalog'
import Header from './components/Header/Header'
import OrderPath from './components/OrderPath/OrderPath'
import SuccessfulOrder from './components/OrderPath/SuccessfulOrder/SuccessfulOrder'


function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path='/' element={<Catalog />} />
          <Route path='/order/*' element={<OrderPath />} />
          <Route path='/cart' element={<Navigate to='/order/cart' replace />} />
          <Route path='/successful-order' element={<SuccessfulOrder />} />
        </Routes>
      </div>
    </>
  )
}

export default App
