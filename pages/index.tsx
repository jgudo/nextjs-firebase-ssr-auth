import { useAuth } from '@/provider/AuthProvider';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <p>{`User ID: ${user ? user.uid : 'no user signed in'}`}</p>

      <p>
        <Link href="/authenticated">
          <a className={styles.link}>
            Go to authenticated route
          </a>
        </Link>
      </p>
      {!user && (
        <p>
          <Link href="/login">
            <a className={styles['link--muted']}>Login</a>
          </Link>
        </p>
      )}
    </div>
  )
}
