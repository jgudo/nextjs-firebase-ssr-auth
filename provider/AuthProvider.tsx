import firebase from '@/utils/firebaseClient';
import nookies from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<{ user: firebase.User | null }>({ user: null });

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            (window as any).nookies = nookies;
        }
        return firebase.auth().onIdTokenChanged(async (user) => {
            console.log(`token changed!`);

            if (!user) {
                console.log(`No token found...`);
                setUser(null);
                nookies.destroy(null, "token");
                nookies.set(null, "token", "", {});
                return;
            }

            console.log(`Updating token...`);
            const token = await user.getIdToken();
            setUser(user);
            nookies.destroy(null, "token");
            nookies.set(null, "token", token, {});
        });
    }, []);

    // force refresh the token every 10 minutes
    useEffect(() => {
        const handle = setInterval(async () => {
            console.log(`Refreshing token...`);
            const user = firebase.auth().currentUser;
            if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);
        return () => clearInterval(handle);
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider as default, useAuth };

