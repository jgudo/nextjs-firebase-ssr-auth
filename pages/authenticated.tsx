import firebaseAdmin from "@/utils/firebaseAdmin";
import firebaseClient from "@/utils/firebaseClient";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import nookies from "nookies";
import React from "react";

const AuthenticatedPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => (
    <div>
        <p>{props.message!}</p>
        <button
            onClick={async () => {
                await firebaseClient.auth().signOut();
                window.location.href = "/";
            }}
        >
            Sign out
        </button>
        <Link href="/">
            Go to Home
        </Link>
    </div>
);


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    try {
        const cookies = nookies.get(ctx);
        console.log(JSON.stringify(cookies, null, 2));
        const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
        const { uid, email } = token;

        // the user is authenticated!
        // FETCH STUFF HERE

        return {
            props: { message: `Your email is ${email} and your UID is ${uid}.` },
        };
    } catch (err) {
        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: redirect to the login page
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            // `as never` is required for correct type inference
            // by InferGetServerSidePropsType below
            props: {} as never,
        };
    }
};

export default AuthenticatedPage;