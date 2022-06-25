import type { NextPage } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/yup';
import roles from '../../assets/roles.json';
import { IData, IRole } from '../../common/interfaces/role.interface';
import axios from 'axios';
import Router from 'next/router';

//styles import
import styles from '../../styles/Signup.module.css';
import style from '../../styles/Form.module.css';

type Data = {
  file: File;
  crop: any;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: Data) => {
    console.log(data);
    const url =
      'https://auth-test-api-techinnover.herokuapp.com/api/v1/user/create';
    const res = await axios.post(url, data);

    if (res.statusText === 'Created') {
      Router.push('/login');
    }
  };

  const options = roles.map((r: IRole) => {
    return (
      <option key={r.id} value={r.value}>
        {r.name}
      </option>
    );
  });

  return (
    <div className={styles.signupContainer}>
      <h1 className={styles.signupTitle}>Signup</h1>

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

        <div className={styles.formGroup}>
          <label htmlFor='fullName' className={style.label}>
            Full name
          </label>
          <br />
          <input
            {...register('fullName')}
            placeholder='Enter your Full name'
            type='text'
            className={style.formInput}
          />
          <p className={errors.fullName ? style.error : ''}>
            {errors.fullName?.message}
          </p>
        </div>

        <div>
          <label htmlFor='role' className={style.label}>
            What is your role
          </label>
          <br />
          <select {...register('userType')} className={style.formInput}>
            {options}
          </select>
        </div>

        <input type='submit' value='Signup' className={style.btn} />
      </form>
    </div>
  );
};

export default Signup;
