import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../utils/yup';
import { toast } from 'react-toastify';

//styles import
import styles from '../../styles/Signup.module.css';
import style from '../../styles/Form.module.css';
import axios from 'axios';
import { IDataLogin } from '../../common/interfaces/role.interface';

type Data = {
  file: File;
  crop: any;
};

const Login: NextPage = () => {
  const notify = () =>
    toast.success('You have successfully login to your account.');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmitHandler = async (data: Data) => {
    try {
      const url =
        'https://auth-test-api-techinnover.herokuapp.com/api/v1/user/login';
      const res = await axios.post(url, data);
      if (res.statusText === 'Created') {
        notify();
        Router.push('/profile');
        document.cookie = `id=${res.data._id}`;
        reset();
      }
    } catch (error: any) {
      const notify = () => toast.error(error.response.data.message);
      notify();
      console.log(error.response.data.message);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h1 className={styles.signupTitle}>Login</h1>

      <form onSubmit={handleSubmit(onSubmitHandler as any)}>
        <div className={style.formGroup}>
          <label htmlFor='email' className={style.label}>
            Email address
          </label>
          <br />
          <input
            {...register('email')}
            placeholder='Enter your email address'
            type='email'
            className={style.formInput}
          />
          <p className={errors.email ? style.error : ''}>
            {errors.email?.message}
          </p>
        </div>

        <div className={style.formGroup}>
          <label htmlFor='password' className={style.label}>
            Password
          </label>
          <br />
          <input
            {...register('password')}
            placeholder='Enter your password'
            type='password'
            className={style.formInput}
          />
          <p className={errors.password ? style.error : ''}>
            {errors.password?.message}
          </p>
        </div>

        <input type='submit' value='Login' className={style.btn} />
      </form>
    </div>
  );
};

export default Login;
