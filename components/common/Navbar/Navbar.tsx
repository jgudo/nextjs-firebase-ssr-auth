import { useAuth } from '@/provider/AuthProvider';
import firebaseClient from '@/utils/firebaseClient';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
    const { user } = useAuth();

    return (
        <nav>
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <Link href="/">
                        <h4>Next Firebase</h4>
                    </Link>
                </li>
                {user && (
                    <>
                        <li className={styles.li}>
                            <button onClick={() => firebaseClient.auth().signOut()}>Logout</button>
                        </li>
                        <li className={styles.li}>{user.email}</li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

