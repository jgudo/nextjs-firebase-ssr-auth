import withAuthServerSideProps from '@/libs/hoc/withAuthServerSide';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

export default function Home({ user }) {
  return (
    <div className={styles.container}>
      {!user && (
        <p>
          <Link href="/login">
            <a className={styles['link--muted']}>Login</a>
          </Link>
        </p>
      )}
      <Link href="/post/create">
        <a className={styles.link}>Create Post</a>
      </Link>
    </div>
  )
}

export const getServerSideProps = withAuthServerSideProps({ redirectIfNotAuth: false });
