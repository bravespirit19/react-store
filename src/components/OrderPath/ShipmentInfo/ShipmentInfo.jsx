import { useForm } from 'react-hook-form';
import s from './ShipmentInfo.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { setUserShipmentInfo } from '../../../store/storeSlice';

const validationSchema = yup.object({
  address: yup
    .string()
    .required('This field is required')
    .min(3, 'Name must contain at least 3 characters'),
  city: yup
    .string()
    .required('This filed is required'),
  country: yup
    .string()
    .required('This field is required'),
  state: yup
    .string()
    .required('This field is required'),
  zipCode: yup
    .string()
    .required('This filed is required')
    .matches(/^\d+$/, 'ZIP code must contain only digits')
    .min(5, 'ZIP code must contain at least 5 digits')
    .max(7, 'ZIP code cannot contain more than 7 digits')

})

const options = ['Select your state', 'Kyiv', 'Odesa', 'Dnipro', 'Kharkiv']
const ShipmentInfo = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(setUserShipmentInfo(data))
    navigate('/successful-order')
  }

  const handlePlaceholderColor = (e) => {
    const select = e.target;

    if (select.value !== '') {
      select.classList.add(s.select_placeholder)
    } else {
      select.classList.remove(s.select_placeholder)
    }
  }
  return (
    <section>
      <h2>Shipment Information</h2>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <div className={s.form_wrap}>
          <div className={s.form_column_wrap}>
            <div className={s.input_wrap}>
              <label htmlFor="address">Address (No P. O. Boxes)*</label>
              <input type="text" {...register('address')} placeholder='Enter your address' className={errors.addres ? s.input_error : ''} />
              {errors.address && <span>{errors.address.message}</span>}
            </div>

            <div className={s.input_wrap}>
              <label htmlFor="apartment">Apartment, suite etc. (optional)</label>
              <input type="text" {...register('apartment')} placeholder='Enter your apartment information' />
            </div>

            <div className={s.input_wrap}>
              <label htmlFor="city">City*</label>
              <input type="text" {...register('city')} placeholder='Enter your city' className={errors.city ? s.input_error : ''} />
              {errors.city && <span>{errors.city.message}</span>}
            </div>
          </div>
          <div className={s.form_row_wrap}>
            <div className={s.input_wrap}>
              <label htmlFor="country">Address (No P. O. Boxes)*</label>
              <select {...register('country')} className={errors.country ? s.input_error : ''} onChange={handlePlaceholderColor}>
                <option value="" disabled selected hidden>Select your country/region</option>
                <option value="Ukraine">Ukraine</option>
              </select>
              {errors.country && <span>{errors.country.message}</span>}
            </div>

            <div className={s.input_wrap}>
              <label htmlFor="state">State*</label>
              <select {...register('state')} className={errors.state ? s.input_error : ''} onChange={handlePlaceholderColor}>
                {options.map((item, index) => {
                  return <option
                    key={index} 
                    value={index === 0 ? '' : item}
                    disabled={index === 0}
                    hidden={index === 0}
                    selected={index === 0}>{item}</option>
                })}
              </select>
              {errors.state && <span>{errors.state.message}</span>}
            </div>

            <div className={s.input_wrap}>
              <label htmlFor="zipCode">ZIP code*</label>
              <input type="text" {...register('zipCode')} placeholder='Enter your ZIP code' className={errors.zipCode ? s.input_error : ''} />
              {errors.zipCode && <span>{errors.zipCode.message}</span>}
            </div>
          </div>
        </div>

        <button type='submit' className={s.next_step_btn}>Next Step</button>
      </form>
    </section>
  )
}

export default ShipmentInfo;