import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../utils/yup';

//styles import
import styles from '../../styles/Signup.module.css';
import style from '../../styles/Form.module.css';
import axios from 'axios';

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmitHandler = async (data: any) => {
    console.log({ data });
    const url =
      'https://auth-test-api-techinnover.herokuapp.com/api/v1/user/login';
    const res = await axios.post(url, data);
    if (res.statusText === 'Created') {
      Router.push('/profile');
    }

    document.cookie = `id=${res.data._id}`;
    // console.log(res.data._id);
    reset();
  };

  return (
    <div className={styles.signupContainer}>
      <h1 className={styles.signupTitle}>Login</h1>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
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
