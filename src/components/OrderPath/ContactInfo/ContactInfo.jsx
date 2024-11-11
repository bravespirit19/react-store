import { useForm } from 'react-hook-form';
import s from './ContactInfo.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setShipmentInfo, setUserContactInfo } from '../../../store/storeSlice';
import * as yup from 'yup';
import InputMask from 'react-input-mask'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = yup.object({
  username: yup
    .string()
    .required('This field is required')
    .min(3, 'Name must contain at least 3 characters'),
  lastname: yup
    .string()
    .required('This field is required')
    .min(3, 'Last name must contain at least 3 characters'),
  email: yup
    .string()
    .required('This field is required')
    .email('Invalid email format'),
  phone: yup
    .string()
    .required('This field is required')
    .matches(/\d.*\d.*\d.*\d.*\d.*\d.*\d.*\d.*\d.*\d.*\d.*\d/, 'Phone number incomplete')
})


const ContactInfo = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(setUserContactInfo(data))
    dispatch(setShipmentInfo())
    navigate('/order/shipment-info')
  }

  return (
    <section>
      <h2>Contact Information</h2>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <div className={s.form_wrap}>
          <div className={s.input_wrap}>
            <label htmlFor="username">First name*</label>
            <input type="text" {...register('username')} placeholder='Enter your first name' className={errors.username ? s.input_error : ''} />
            {errors.username && <span>{errors.username.message}</span>}
          </div>

          <div className={s.input_wrap}>
            <label htmlFor="lastname">Last name*</label>
            <input type="text" {...register('lastname')} placeholder='Enter your last name' className={errors.lastname ? s.input_error : ''} />
            {errors.lastname && <span>{errors.lastname.message}</span>}
          </div>

          <div className={s.input_wrap}>
            <label htmlFor="email">Email*</label>
            <input type="email" {...register('email')} placeholder='Enter your email' className={errors.email ? s.input_error : ''} />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className={s.input_wrap}>
            <label htmlFor="phone">Phone*</label>
            <InputMask mask='+38 (999) 999 9999' {...register('phone')} placeholder='Enter your phone' className={`s.phone_mask ${errors.username ? s.input_error : ''}`} />
            {errors.phone && <span>{errors.phone.message}</span>}
          </div>
        </div>
        <button type='submit' className={s.next_step_btn}>Next Step</button>
      </form>
    </section>
  )
}

export default ContactInfo;