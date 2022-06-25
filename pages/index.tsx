import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>TechinnOver Edu</title>
        <meta name='description' content='Techinnover education' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className={styles.hOne}>Welcome to TechinnOver Education</h1>

      <h4 className={styles.heading}>
        <Link href='/login' className={styles.Link}>
          Login
        </Link>{' '}
        if you are already a member
      </h4>
      <h4 className={styles.heading}>
        <Link href='/signup' className={styles.Link}>
          Create Account
        </Link>{' '}
        to be a member
      </h4>
    </div>
  );
};

export default Home;
