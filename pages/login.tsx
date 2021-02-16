import withAuthServerSideProps from '@/libs/hoc/withAuthServerSide';
import firebaseClient from '@/utils/firebaseClient';
import { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import React, { FC, useState } from 'react';

const Login: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ user }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    if (user) Router.push('/');

    return (
        <div>
            <Link href="/">
                <a>Go back to home page</a>
            </Link>
            <br />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={'Email'}
            />
            <input
                type={'password'}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder={'Password'}
            />
            <button
                onClick={async () => {
                    await firebaseClient
                        .auth()
                        .createUserWithEmailAndPassword(email, pass);
                    window.location.href = '/';
                }}
            >
                Create account
        </button>
            <button
                onClick={async () => {
                    await firebaseClient.auth().signInWithEmailAndPassword(email, pass);
                    window.location.href = '/';
                }}
            >
                Log in
        </button>
        </div>
    );
};

export const getServerSideProps = withAuthServerSideProps({ redirectIfNotAuth: false });

export default Login;